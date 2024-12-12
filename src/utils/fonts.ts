// Font loading utility
export const loadFonts = async () => {
  try {
    // Load fonts in parallel
    const [amiriBoldResponse, amiriRegularResponse] = await Promise.all([
      fetch('https://nsajco.com/Amiri-Bold.ttf'),
      fetch('https://nsajco.com/Amiri-Italic.ttf')
    ]);

    // Check responses
    if (!amiriBoldResponse.ok || !amiriRegularResponse.ok) {
      throw new Error('Failed to load one or more fonts');
    }

    // Convert to array buffers
    const [amiriBold, amiriRegular] = await Promise.all([
      amiriBoldResponse.arrayBuffer(),
      amiriRegularResponse.arrayBuffer()
    ]);

    // Convert array buffers to base64
    const amiriBoldBase64 = arrayBufferToBase64(amiriBold);
    const amiriRegularBase64 = arrayBufferToBase64(amiriRegular);

    return {
      amiriBold: amiriBoldBase64,
      amiriRegular: amiriRegularBase64
    };
  } catch (error) {
    console.error('Error loading fonts:', error);
    throw new Error('فشل في تحميل الخطوط العربية');
  }
};

// Helper function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  
  return btoa(binary);
}

// Cache fonts in memory
let fontCache: { amiriBold?: string; amiriRegular?: string } = {};

// Get fonts with caching
export const getFonts = async () => {
  if (!fontCache.amiriBold || !fontCache.amiriRegular) {
    const fonts = await loadFonts();
    fontCache = fonts;
  }
  return fontCache;
};

// Clear font cache if needed
export const clearFontCache = () => {
  fontCache = {};
};