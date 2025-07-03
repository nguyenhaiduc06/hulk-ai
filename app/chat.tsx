import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';

import { Container } from '~/components/Container';
import { CustomHeader } from '~/components/CustomHeader';
import { generateResponse, ChatMessage } from '~/utils/openai';
import {
  getMessageLimitState,
  incrementMessageCount,
  canSendMessage,
  DAILY_MESSAGE_LIMIT,
  MessageLimitState,
} from '~/utils/messageLimit';
import { useSubscriptionStore, useAIModelStore, useChatHistoryStore } from '~/store/store';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export default function Chat() {
  const { initialPrompt, taskTitle, sessionId } = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messageLimitState, setMessageLimitState] = useState<MessageLimitState>({
    messagesLeft: DAILY_MESSAGE_LIMIT,
    maxMessages: DAILY_MESSAGE_LIMIT,
    lastResetDate: new Date().toDateString(),
  });
  const scrollViewRef = useRef<ScrollView>(null);
  const isPremium = useSubscriptionStore((state) => state.isPremium);
  const { selectedModel, getCurrentModel } = useAIModelStore();
  const { createSession, addMessage, getSession, setCurrentSession } = useChatHistoryStore();
  const expandValue = useSharedValue(0);

  // Load message limit state on component mount
  useEffect(() => {
    loadMessageLimitState();
  }, []);

  const loadMessageLimitState = async () => {
    const state = await getMessageLimitState();
    setMessageLimitState(state);
  };

  // Initialize session and messages
  useEffect(() => {
    const initializeSession = async () => {
      const currentModel = getCurrentModel();
      const modelId = currentModel?.id || selectedModel;

      if (sessionId) {
        // Load existing session
        const session = getSession(sessionId as string);
        if (session) {
          setCurrentSessionId(sessionId as string);
          setCurrentSession(sessionId as string);

          // Convert stored messages to local format
          const localMessages: Message[] = session.messages.map((msg) => ({
            id: msg.id,
            text: msg.content,
            isUser: msg.role === 'user',
            timestamp: new Date(msg.timestamp),
          }));
          setMessages(localMessages);
        }
      } else {
        // Create new session
        const newSessionId = createSession(modelId);
        setCurrentSessionId(newSessionId);
        setCurrentSession(newSessionId);

        // Add welcome message
        const welcomeMessage: Message = {
          id: '1',
          text: taskTitle
            ? `Hello! I'm your AI assistant for ${taskTitle}. How can I help you today?`
            : "Hello! I'm your AI assistant. How can I help you today?",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);

        // Store welcome message in session
        addMessage(newSessionId, {
          role: 'assistant',
          content: welcomeMessage.text,
          modelId,
        });
      }

      // If there's an initial prompt, prefill the input field
      if (initialPrompt) {
        setInputText(initialPrompt as string);
      }
    };

    initializeSession();
  }, [
    sessionId,
    initialPrompt,
    taskTitle,
    createSession,
    getSession,
    setCurrentSession,
    addMessage,
    getCurrentModel,
    selectedModel,
  ]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const sendMessage = async () => {
    if (inputText.trim() && !isLoading && currentSessionId) {
      // Check if user can send a message (skip for premium users)
      if (!isPremium) {
        const canSend = await canSendMessage();
        if (!canSend) {
          Alert.alert(
            'Daily Limit Reached',
            'You have reached your daily message limit of 5 messages. Please try again tomorrow.',
            [{ text: 'OK' }]
          );
          return;
        }
      }

      const userMessage = inputText.trim();
      setInputText('');
      setIsLoading(true);

      // Increment message count (skip for premium users)
      if (!isPremium) {
        const newLimitState = await incrementMessageCount();
        setMessageLimitState(newLimitState);
      }

      // Add user message to local state
      const newUserMessage: Message = {
        id: Date.now().toString(),
        text: userMessage,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newUserMessage]);

      // Store user message in chat history
      const currentModel = getCurrentModel();
      const modelId = currentModel?.id || selectedModel;
      addMessage(currentSessionId, {
        role: 'user',
        content: userMessage,
        modelId,
      });

      try {
        // Convert messages to OpenAI format for context
        const conversationHistory: ChatMessage[] = messages
          .filter((msg) => !msg.isUser) // Only include AI messages for context
          .map((msg) => ({
            role: 'assistant' as const,
            content: msg.text,
          }));

        // Generate AI response
        const aiResponse = await generateResponse(
          userMessage,
          conversationHistory,
          currentModel?.model || selectedModel,
          currentModel?.systemPrompt
        );

        // Add AI response to local state
        const newAiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newAiMessage]);

        // Store AI response in chat history
        addMessage(currentSessionId, {
          role: 'assistant',
          content: aiResponse,
          modelId,
        });
      } catch (error) {
        console.error('Error generating response:', error);
        // Add error message to local state
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm sorry, I'm having trouble responding right now. Please try again.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);

        // Store error message in chat history
        addMessage(currentSessionId, {
          role: 'assistant',
          content: errorMessage.text,
          modelId,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInputSubmit = async () => {
    if (!isPremium && messageLimitState.messagesLeft <= 0) {
      Alert.alert(
        'Daily Limit Reached',
        'You have reached your daily message limit of 5 messages. Please try again tomorrow.',
        [{ text: 'OK' }]
      );
      return;
    }
    await sendMessage();
  };

  const handleUpgradeToPremium = () => {
    router.push('/paywall');
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    expandValue.value = withSpring(isExpanded ? 0 : 1, {
      damping: 15,
      stiffness: 150,
    });
  };

  const animatedInputStyle = useAnimatedStyle(() => {
    const height = interpolate(expandValue.value, [0, 1], [56, 250]);
    return {
      height,
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    const rotation = interpolate(expandValue.value, [0, 1], [180, 0]);
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  return (
    <View className="pb-safe flex-1">
      {/* Custom Header */}
      <CustomHeader
        title={taskTitle ? `${taskTitle} Assistant` : 'Chat'}
        messagesLeft={messageLimitState.messagesLeft}
        maxMessages={messageLimitState.maxMessages}
        showModelSelector={true}
        onUpgradePress={handleUpgradeToPremium}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View className="flex-1">
          <View className="flex-1">
            {/* Messages */}
            <ScrollView
              ref={scrollViewRef}
              className="flex-1"
              contentContainerStyle={{ padding: 16 }}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
              onLayout={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
              {messages.map((message) => (
                <View
                  key={message.id}
                  className={`mb-4 ${message.isUser ? 'items-end' : 'items-start'}`}>
                  <View
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.isUser ? 'rounded-br-md bg-primary' : 'rounded-bl-md bg-gray-200'
                    }`}>
                    <Text
                      className={`text-base ${message.isUser ? 'text-white' : 'text-gray-800'}`}>
                      {message.text}
                    </Text>
                    <Text
                      className={`mt-1 text-xs ${
                        message.isUser ? 'text-white/80' : 'text-gray-500'
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

              {/* Daily limit reached message with premium CTA */}
              {!isPremium && messageLimitState.messagesLeft === 0 && (
                <View className="mb-4 items-center">
                  <View className="max-w-[80%] rounded-3xl border-2 border-primary bg-white p-6 shadow-lg">
                    <View className="mb-4 flex-row items-center">
                      <View className="mr-4 h-10 w-10 items-center justify-center rounded-2xl bg-primary-light">
                        <Text className="text-lg text-white">💎</Text>
                      </View>
                      <Text className="font-clash-semibold text-lg text-text-primary">
                        Upgrade to Premium
                      </Text>
                    </View>
                    <Text className="mb-6 font-inter text-base text-text-secondary">
                      You've reached your daily message limit. Upgrade to Premium for unlimited
                      messages, faster responses, and advanced AI models.
                    </Text>
                    <TouchableOpacity
                      onPress={handleUpgradeToPremium}
                      className="items-center rounded-2xl bg-primary px-6 py-4">
                      <Text className="font-clash-medium text-base text-white">Upgrade Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Input */}
            <View className="border-t-2 border-gray-100 px-6 py-4">
              {/* Expand Button */}
              <TouchableOpacity
                onPress={toggleExpand}
                className="mb-2 h-8 w-8 items-center justify-center self-start rounded-full bg-gray-200"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Animated.View style={animatedButtonStyle}>
                  <Ionicons name="chevron-down" size={16} color="#6b7280" />
                </Animated.View>
              </TouchableOpacity>

              <View className="flex-row items-end">
                <View className="mr-4 flex-1">
                  <Animated.View style={animatedInputStyle}>
                    <TextInput
                      className="flex-1 rounded-2xl border-2 border-gray-200 px-5 py-4 font-inter text-base"
                      placeholder={
                        isPremium
                          ? 'Type a message...'
                          : messageLimitState.messagesLeft === 0
                            ? 'Daily limit reached'
                            : 'Type a message...'
                      }
                      value={inputText}
                      onChangeText={setInputText}
                      onSubmitEditing={handleInputSubmit}
                      returnKeyType="send"
                      multiline={true}
                      editable={!isLoading && (isPremium || messageLimitState.messagesLeft > 0)}
                      style={{
                        opacity: !isPremium && messageLimitState.messagesLeft === 0 ? 0.5 : 1,
                      }}
                    />
                  </Animated.View>
                </View>

                {/* Send Button */}
                <TouchableOpacity
                  onPress={handleInputSubmit}
                  className={`h-[56px] w-[56px] items-center justify-center rounded-2xl ${
                    isLoading ||
                    !inputText.trim() ||
                    (!isPremium && messageLimitState.messagesLeft === 0)
                      ? 'bg-gray-300'
                      : 'bg-primary'
                  }`}
                  disabled={
                    isLoading ||
                    !inputText.trim() ||
                    (!isPremium && messageLimitState.messagesLeft === 0)
                  }>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Ionicons name="arrow-forward" size={20} color="white" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
