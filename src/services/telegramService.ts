import { ContactFormData } from '../types';

/**
 * Sends a notification to a Telegram bot.
 * Requires VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in environment variables.
 */
export const sendTelegramNotification = async (data: ContactFormData): Promise<{ success: boolean; error?: string }> => {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { 
      success: false, 
      error: 'Telegram API keys are missing. Please set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in Secrets.' 
    };
  }

  const message = `
🚀 *New Enrollment Inquiry*
----------------------------
👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📚 *Course:* ${data.course}
💬 *Message:* ${data.message}
----------------------------
Sent from Zynovia Academy Website
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.description || 'Failed to send message to Telegram.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return { success: false, error: 'Network error. Please check your connection.' };
  }
};
