import { translate } from 'google-translate-api-browser';

// Improved caching with TTL
interface CacheEntry {
  value: string;
  timestamp: number;
}

class TranslationCache {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly TTL = 24 * 60 * 60 * 1000; // 24 hours

  set(key: string, value: string): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  get(key: string): string | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.value;
  }

  clear(): void {
    this.cache.clear();
  }
}

const cache = new TranslationCache();

// Web Worker for parallel processing
const workerCode = `
  self.onmessage = async function(e) {
    const { text, targetLang } = e.data;
    try {
      const response = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=' + targetLang + '&dt=t&q=' + encodeURIComponent(text));
      const data = await response.json();
      self.postMessage({ success: true, translation: data[0][0][0] });
    } catch (error) {
      self.postMessage({ success: false, error: error.message });
    }
  };
`;

const workerBlob = new Blob([workerCode], { type: 'application/javascript' });
const workerUrl = URL.createObjectURL(workerBlob);

export const translateService = {
  workers: [] as Worker[],
  maxWorkers: 4,

  initWorkers() {
    for (let i = 0; i < this.maxWorkers; i++) {
      this.workers.push(new Worker(workerUrl));
    }
  },

  terminateWorkers() {
    this.workers.forEach(worker => worker.terminate());
    this.workers = [];
    URL.revokeObjectURL(workerUrl);
  },

  async translateText(text: string, targetLang: string): Promise<string> {
    try {
      // Check cache first
      const cached = cache.get(`${text}_${targetLang}`);
      if (cached) return cached;

      // Skip translation if not needed
      if (!this.shouldTranslate(text)) return text;

      // Use worker from pool
      const worker = this.workers[Math.floor(Math.random() * this.maxWorkers)];
      
      const translation = await new Promise<string>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Translation timeout'));
        }, 5000);

        worker.onmessage = (e) => {
          clearTimeout(timeout);
          if (e.data.success) {
            resolve(e.data.translation);
          } else {
            reject(new Error(e.data.error));
          }
        };

        worker.postMessage({ text, targetLang });
      });

      // Cache successful translation
      cache.set(`${text}_${targetLang}`, translation);
      return translation;

    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  },

  async translatePage(elements: HTMLElement[], targetLang: string): Promise<void> {
    try {
      // Initialize workers if needed
      if (this.workers.length === 0) {
        this.initWorkers();
      }

      // Get text nodes efficiently
      const textNodes = this.getTextNodes(elements);
      
      // Group similar texts to reduce API calls
      const uniqueTexts = new Map<string, Text[]>();
      textNodes.forEach(node => {
        const text = node.textContent || '';
        if (!uniqueTexts.has(text)) {
          uniqueTexts.set(text, []);
        }
        uniqueTexts.get(text)?.push(node);
      });

      // Translate unique texts in parallel
      const translations = await Promise.all(
        Array.from(uniqueTexts.keys())
          .filter(text => this.shouldTranslate(text))
          .map(async text => ({
            original: text,
            translated: await this.translateText(text, targetLang)
          }))
      );

      // Apply translations efficiently
      translations.forEach(({ original, translated }) => {
        const nodes = uniqueTexts.get(original) || [];
        nodes.forEach(node => {
          node.textContent = translated;
        });
      });

    } catch (error) {
      console.error('Page translation error:', error);
    }
  },

  getTextNodes(elements: HTMLElement[]): Text[] {
    const textNodes: Text[] = [];
    const excludeClasses = ['no-translate', 'notranslate'];
    const excludeElements = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE'];
    
    const treeWalker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          
          if (excludeElements.includes(parent.tagName)) {
            return NodeFilter.FILTER_REJECT;
          }
          
          if (parent.getAttribute('translate') === 'no') {
            return NodeFilter.FILTER_REJECT;
          }
          
          if (excludeClasses.some(cls => parent.classList.contains(cls))) {
            return NodeFilter.FILTER_REJECT;
          }
          
          if (!this.shouldTranslate(node.textContent || '')) {
            return NodeFilter.FILTER_REJECT;
          }
          
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node;
    while (node = treeWalker.nextNode()) {
      textNodes.push(node as Text);
    }

    return textNodes;
  },

  shouldTranslate(text: string): boolean {
    const trimmed = text.trim();
    
    // Quick rejections
    if (!trimmed || trimmed.length < 2) return false;
    if (/^\d+$/.test(trimmed)) return false;
    if (trimmed.startsWith('http') || trimmed.startsWith('www.')) return false;

    // Check for meaningful content
    const hasLetters = /[a-zA-Zא-תأ-ي\u0600-\u06FF]/.test(trimmed);
    const isSpecialCharsOnly = /^[^a-zA-Zא-תأ-ي\u0600-\u06FF]+$/.test(trimmed);
    
    return hasLetters && !isSpecialCharsOnly;
  },

  cleanup() {
    this.terminateWorkers();
    cache.clear();
  }
};