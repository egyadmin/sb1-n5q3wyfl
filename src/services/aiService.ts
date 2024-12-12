import axios from 'axios';

const MONICA_API_URL = 'http://195.179.229.119/gpt/api.php';
const API_KEY = '97fe04c0fb8a87a5cce2808bb5c1349f';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const aiService = {
  async chat(messages: Message[]): Promise<string> {
    try {
      // Get the last user message
      const lastUserMessage = messages[messages.length - 1];
      
      // Build query parameters
      const params = new URLSearchParams({
        prompt: lastUserMessage.content,
        api_key: API_KEY,
        model: 'gpt-3.5-turbo'
      });

      const response = await axios.get(`${MONICA_API_URL}?${params.toString()}`);

      if (response.data && response.data.choices && response.data.choices[0]?.message?.content) {
        return response.data.choices[0].message.content;
      }

      // Handle text response format
      if (typeof response.data === 'string') {
        return response.data;
      }

      throw new Error('لم يتم استلام رد من المساعد');

    } catch (error) {
      console.error('Chat API Error:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('خطأ في المصادقة. يرجى التحقق من مفتاح API.');
        }
        if (error.response?.status === 429) {
          throw new Error('تم تجاوز حد الطلبات. يرجى المحاولة مرة أخرى لاحقاً.');
        }
      }
      
      throw new Error('عذراً، حدث خطأ في معالجة طلبك. الرجاء المحاولة مرة أخرى.');
    }
  },

  // Helper method to clean and prepare messages
  prepareMessage(message: string): string {
    // Remove any special characters or formatting that might cause issues
    return message.trim().replace(/[^\w\s\u0600-\u06FF.,!?-]/g, '');
  }
};