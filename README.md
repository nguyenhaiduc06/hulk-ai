# Hulk AI Chat App

A React Native chat application with OpenAI integration built using Expo Router.

## Features

- Real-time chat interface with OpenAI GPT-4.1-nano
- Keyboard avoiding view for better mobile experience
- Auto-scrolling to latest messages
- Loading states and error handling
- Modern UI with Tailwind CSS

## Setup

### 1. Install Dependencies

```bash
yarn install
```

### 2. OpenAI API Key Setup

To use the chat functionality, you need to set up your OpenAI API key:

1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a `.env` file in the root directory
3. Add your API key to the `.env` file:

```
EXPO_PUBLIC_OPEN_AI_API_KEY=your_actual_api_key_here
```

**Important Security Note**:

- For production apps, never expose API keys in client-side code
- Consider using a backend service to handle OpenAI API calls
- The current implementation uses `dangerouslyAllowBrowser: true` for development only

### 3. Run the App

```bash
# Start the development server
yarn start

# Run on iOS
yarn ios

# Run on Android
yarn android

# Run on web
yarn web
```

## Project Structure

```
hulk-ai/
├── app/                 # Expo Router pages
│   ├── index.tsx       # Home screen
│   ├── chat.tsx        # Chat screen with OpenAI
│   └── details.tsx     # Details screen
├── components/         # Reusable components
├── utils/             # Utility functions
│   └── openai.ts      # OpenAI integration
└── store/             # State management
```

## OpenAI Integration

The app uses OpenAI's GPT-4.1-nano model for generating responses. Key features:

- **Conversation Context**: Maintains conversation history for better responses
- **Error Handling**: Graceful handling of API errors and rate limits
- **Loading States**: Visual feedback while generating responses
- **Response Limits**: Limited to 150 tokens for concise chat responses
- **Advanced AI**: GPT-4.1-nano provides improved reasoning and response quality

## Development

### Adding New Features

1. Create new screens in the `app/` directory
2. Add reusable components in `components/`
3. Update navigation in `app/index.tsx`

### Environment Variables

The app uses Expo's environment variable system. All environment variables must be prefixed with `EXPO_PUBLIC_` to be accessible in the client-side code.

## Troubleshooting

### OpenAI API Issues

- Ensure your API key is valid and has sufficient credits
- Check that the `.env` file is in the root directory
- Verify the environment variable name is correct: `EXPO_PUBLIC_OPEN_AI_API_KEY`

### Build Issues

- Clear cache: `expo start --clear`
- Reset Metro: `yarn start --reset-cache`
- Check for TypeScript errors: `yarn lint`
