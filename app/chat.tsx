import { Stack } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
} from 'react-native';

import { Container } from '~/components/Container';
import { generateResponse, ChatMessage } from '~/utils/openai';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const sendMessage = async () => {
    if (inputText.trim() && !isLoading) {
      const userMessage = inputText.trim();
      setInputText('');
      setIsLoading(true);

      // Add user message
      const newUserMessage: Message = {
        id: Date.now().toString(),
        text: userMessage,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newUserMessage]);

      try {
        // Convert messages to OpenAI format for context
        const conversationHistory: ChatMessage[] = messages
          .filter((msg) => !msg.isUser) // Only include AI messages for context
          .map((msg) => ({
            role: 'assistant' as const,
            content: msg.text,
          }));

        // Generate AI response
        const aiResponse = await generateResponse(userMessage, conversationHistory);

        // Add AI response
        const newAiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newAiMessage]);
      } catch (error) {
        console.error('Error generating response:', error);
        // Add error message
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm sorry, I'm having trouble responding right now. Please try again.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Chat' }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <Container>
          <View className="flex-1">
            {/* Messages */}
            <ScrollView
              ref={scrollViewRef}
              className="flex-1 px-4"
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
              onLayout={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
              {messages.map((message) => (
                <View
                  key={message.id}
                  className={`mb-4 ${message.isUser ? 'items-end' : 'items-start'}`}>
                  <View
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.isUser ? 'rounded-br-md bg-indigo-500' : 'rounded-bl-md bg-gray-200'
                    }`}>
                    <Text
                      className={`text-base ${message.isUser ? 'text-white' : 'text-gray-800'}`}>
                      {message.text}
                    </Text>
                    <Text
                      className={`mt-1 text-xs ${
                        message.isUser ? 'text-indigo-100' : 'text-gray-500'
                      }`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </View>
                </View>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <View className="mb-4 items-start">
                  <View className="max-w-[80%] rounded-2xl rounded-bl-md bg-gray-200 px-4 py-3">
                    <View className="flex-row items-center">
                      <ActivityIndicator size="small" color="#6b7280" />
                      <Text className="ml-2 text-gray-600">AI is thinking...</Text>
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Input */}
            <View className="flex-row items-center border-t border-gray-200 px-4 py-3">
              <TextInput
                className="mr-3 flex-1 rounded-full border border-gray-300 px-4 py-3"
                placeholder="Type a message..."
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={sendMessage}
                returnKeyType="send"
                multiline={false}
                blurOnSubmit={true}
                editable={!isLoading}
              />
              <TouchableOpacity
                onPress={sendMessage}
                className={`h-12 w-12 items-center justify-center rounded-full ${
                  isLoading || !inputText.trim() ? 'bg-gray-400' : 'bg-indigo-500'
                }`}
                disabled={isLoading || !inputText.trim()}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text className="text-lg text-white">➤</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
}
