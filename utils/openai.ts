import OpenAI from 'openai';

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true, // Only for development - use server-side in production
});

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function generateResponse(
  userMessage: string,
  conversationHistory: ChatMessage[] = [],
  selectedModel: string = 'gpt-4o-mini',
  systemPrompt?: string
): Promise<string> {
  try {
    // Create conversation context
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content:
          systemPrompt ||
          'You are a helpful and friendly AI assistant. Keep your responses concise and engaging. Be conversational and helpful.',
      },
      ...conversationHistory,
      {
        role: 'user',
        content: userMessage,
      },
    ];

    const response = await client.chat.completions.create({
      model: selectedModel,
      messages: messages as any,
      max_tokens: 150, // Limit response length for chat
      temperature: 0.7, // Add some creativity
    });

    return (
      response.choices[0]?.message?.content ||
      "I'm sorry, I couldn't generate a response right now."
    );
  } catch (error) {
    console.error('OpenAI API Error:', error);

    // Handle specific error cases
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return "I'm having trouble connecting to my AI service. Please check the API configuration.";
      }
      if (error.message.includes('rate limit')) {
        return "I'm getting too many requests right now. Please try again in a moment.";
      }
    }

    return "I'm sorry, I'm having trouble responding right now. Please try again later.";
  }
}

// Alternative function for simple responses (like the example you provided)
export async function generateSimpleResponse(
  prompt: string,
  selectedModel: string = 'gpt-4o-mini',
  systemPrompt?: string
): Promise<string> {
  try {
    const messages: any[] = [];

    if (systemPrompt) {
      messages.push({
        role: 'system',
        content: systemPrompt,
      });
    }

    messages.push({
      role: 'user',
      content: prompt,
    });

    const response = await client.chat.completions.create({
      model: selectedModel,
      messages,
      max_tokens: 100,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || 'No response generated.';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return "Sorry, I couldn't generate a response right now.";
  }
}
