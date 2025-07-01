# HULK AI - Master Plan

## 📱 App Overview

**Hulk AI** is a React Native mobile application built with Expo Router that provides AI-powered task assistance through an intuitive chat interface. The app leverages OpenAI's GPT-4.1-nano model to help users with various tasks across different categories.

## 🎯 Core Mission

To provide users with a seamless, AI-powered assistant that can help with work, personal, health, learning, and finance-related tasks through natural conversation.

## 🏗️ Technical Architecture

### Tech Stack

- **Framework**: React Native with Expo Router
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: Zustand
- **AI Integration**: OpenAI GPT-4.1-nano
- **Backend**: Supabase (configured but not yet implemented)
- **Navigation**: Expo Router with tab-based navigation
- **Development**: Expo Dev Client

### Project Structure

```
hulk-ai/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen with 3 sections
│   │   └── ai-task.tsx    # AI Task browser
│   ├── chat.tsx           # Chat interface
│   └── details.tsx        # Details screen
├── components/            # Reusable UI components
│   ├── CustomHeader.tsx   # Custom header with message limit indicator
│   ├── ChatInputButton.tsx # Chat input button component
│   ├── SuggestionCard.tsx # Suggestion card component
│   └── RecentChatCard.tsx # Recent chat card component
├── utils/                 # Utility functions
│   ├── openai.ts         # OpenAI integration
│   ├── supabase.ts       # Supabase client
│   ├── messageLimit.ts   # Daily message limit management
│   └── mockData.ts       # Mock data for suggestions and recent chats
├── store/                # State management
└── assets/               # App assets
```

## ✅ Current Features (Implemented)

### 1. Core Chat Interface

- **Status**: ✅ Complete
- **Description**: Real-time chat interface with OpenAI integration
- **Features**:
  - Natural conversation flow
  - Message history with timestamps
  - Auto-scrolling to latest messages
  - Loading states and error handling
  - Keyboard avoiding view for mobile
  - Context-aware responses using conversation history

### 2. AI Task Browser

- **Status**: ✅ Complete
- **Description**: Categorized task selection interface
- **Features**:
  - 12 predefined AI tasks across 6 categories
  - Category filtering (All, Work, Personal, Health, Learning, Finance)
  - Grid layout with emoji icons
  - Task-specific prompts and descriptions
  - Direct navigation to chat with pre-filled prompts

### 3. Task Categories & Tasks

- **Status**: ✅ Complete
- **Categories**:
  - **Work**: Text Summarizer, Code Generator, Content Writer, Document Processor
  - **Personal**: Language Translator, Chatbot Builder
  - **Health**: Voice Assistant, Recommendation Engine
  - **Learning**: Image Analyzer, Code Reviewer
  - **Finance**: Data Analyzer, Predictive Analytics

### 4. OpenAI Integration

- **Status**: ✅ Complete
- **Features**:
  - GPT-4.1-nano model integration
  - Conversation context maintenance
  - Error handling for API issues
  - Rate limiting protection
  - Response token limiting (150 tokens)
  - Temperature control for creativity

### 5. UI/UX Components

- **Status**: ✅ Complete
- **Features**:
  - Modern, clean design with Tailwind CSS
  - Responsive layout
  - Loading indicators
  - Error states
  - Tab-based navigation
  - Consistent styling across screens

### 6. Daily Message Limit System

- **Status**: ✅ Complete
- **Description**: User message limit management with visual indicators
- **Features**:
  - 5 messages per day limit
  - Daily reset at midnight
  - Custom header with message counter
  - Visual indicators (green/amber/red) based on remaining messages
  - Persistent storage using AsyncStorage
  - Graceful handling when limit is reached
  - User-friendly alerts and disabled states
  - **Consistent across all screens**: Custom header implemented on Home, AI Tasks, Chat, and Details screens

### 7. Enhanced Home Screen

- **Status**: ✅ Complete
- **Description**: Redesigned home screen with three main sections
- **Features**:
  - **Chat Section**: Text input-like button that navigates to chat screen
  - **Suggestions Section**: Horizontal scrollable cards with popular prompts
    - 6 predefined suggestion cards with emojis
    - Sample user chat titles and AI response descriptions
    - Tap to navigate to chat with pre-filled prompt
  - **Recent Chats Section**: Horizontal scrollable cards showing conversation history
    - Mock data for recent conversations
    - Shows last user message as title and last AI response as description
    - Task type badges with color coding
    - Timestamps for each conversation
    - Tap to continue conversation with pre-filled prompt

### 8. Unified Custom Header System

- **Status**: ✅ Complete
- **Description**: Consistent custom header across all app screens
- **Features**:
  - **Message Limit Indicator**: Shows remaining daily messages on all screens
  - **Safe Area Support**: Proper handling of device notches and status bars
  - **Consistent Design**: Uniform header design across Home, AI Tasks, Chat, and Details screens
  - **Dynamic Titles**: Context-aware titles for each screen
  - **Back Button Logic**: Shows/hides back button based on navigation context
  - **Real-time Updates**: Message limit updates in real-time across all screens
  - **Interactive Indicator**: Tappable message counter that shows bottom sheet modal

### 9. Paywall & Premium Features

- **Status**: ✅ Complete
- **Description**: Premium subscription system with paywall screen and upgrade CTAs
- **Features**:
  - **Paywall Screen**: Modern, feature-rich subscription screen
    - Premium features showcase with icons and descriptions
    - Monthly ($9.99) and yearly ($99.99) subscription plans
    - User testimonials and social proof
    - Free trial promotion (7-day trial)
    - Professional gradient design with premium branding
  - **Bottom Sheet Modal**: Interactive message limit information
    - Shows when tapping message indicator in header
    - Explains free plan benefits (5 messages/day, basic AI, standard response times)
    - Premium upgrade CTA with feature highlights
    - "Maybe Later" and "Upgrade Now" action buttons
  - **Premium CTAs in Chat**: Upgrade prompts when limit reached
    - Gradient premium card in chat when no messages left
    - Clear value proposition and upgrade button
    - Seamless navigation to paywall screen
  - **Navigation Integration**: Smooth flow from CTAs to paywall
    - Direct navigation from header modal
    - Direct navigation from chat CTA
    - Proper back navigation handling

### 10. AI Model Selection

- **Status**: ✅ Complete
- **Description**: Dynamic AI model selection system with premium model access and custom system prompts
- **Features**:
  - **Model Selection Button**: Replaces screen title in chat header
    - Shows currently selected model name
    - Settings icon with dropdown indicator
    - Tappable to open model selection modal
  - **Model Selection Modal**: Comprehensive model browser
    - 4 available models: GPT-4o Mini, GPT-4o, GPT-3.5 Turbo, GPT-4 Turbo
    - Model-specific system prompts displayed as descriptions
    - Premium model indicators and access control
    - Visual selection states with checkmarks
    - Premium upgrade CTA for non-premium users
  - **Model Access Control**: Premium model restrictions
    - Free users: GPT-4o Mini, GPT-3.5 Turbo
    - Premium users: All models including GPT-4o and GPT-4 Turbo
    - Locked model overlays with "Premium Required" indicators
  - **Dynamic Model Integration**: Real-time model switching with custom prompts
    - Selected model and system prompt passed to OpenAI API calls
    - Persistent model selection using AsyncStorage
    - Default model: GPT-4o Mini with friendly system prompt
    - Model selection affects all chat interactions with personality changes
  - **Enhanced OpenAI Integration**: Updated utility functions
    - `generateResponse()` accepts model and systemPrompt parameters
    - `generateSimpleResponse()` accepts model and systemPrompt parameters
    - Backward compatibility with default model and prompt fallback
    - Error handling for model-specific issues
  - **Model-Specific Personalities**: Each model has unique system prompt (all using GPT-4.1-nano)
    - GPT-4o Mini: Fast, concise, practical responses with friendly personality
    - GPT-4o: Most advanced with deep knowledge, complex reasoning, and comprehensive responses
    - GPT-3.5 Turbo: Reliable, efficient, balanced responses with dependable guidance
    - GPT-4 Turbo: Enhanced capabilities with sophisticated reasoning and detailed analysis

## 🚧 In Progress Features

### 1. Supabase Integration

- **Status**: 🔄 Configured but not implemented
- **Planned Features**:
  - User authentication
  - Chat history persistence
  - User preferences storage
  - Task completion tracking

### 2. State Management Enhancement

- **Status**: 🔄 Basic Zustand setup complete
- **Planned Features**:
  - Chat session management
  - User preferences
  - Task progress tracking
  - Offline support

## 📋 Planned Features (Roadmap)

### Phase 1: Core Enhancement (Next 2-4 weeks)

- ✅ **Settings Screen**
  - Account and subscription management
  - AI model preferences and selection
  - App preferences and customization
  - Privacy and security settings
  - Support and about information

- [ ] **User Authentication**
  - Email/password signup/login
  - Social authentication (Google, Apple)
  - User profile management

- [ ] **Chat History Persistence**
  - Save conversations to Supabase
  - Chat history browser
  - Search through past conversations
  - Export chat history

- [ ] **Enhanced Task Management**
  - Custom task creation
  - Task favorites
  - Task completion tracking
  - Task performance analytics

- [ ] **Premium Subscription Integration**
  - Real payment processing (Stripe/Apple Pay/Google Pay)
  - Subscription status management
  - Premium feature unlocking
  - Subscription analytics and tracking

### Phase 2: Advanced Features (Next 1-2 months)

- [ ] **Voice Integration**
  - Speech-to-text input
  - Text-to-speech output
  - Voice command recognition
  - Multi-language voice support

- [ ] **File Upload & Processing**
  - Image upload and analysis
  - Document upload and processing
  - PDF text extraction
  - Spreadsheet data analysis

- [ ] **Advanced AI Features**
  - Multi-modal AI (text + image)
  - Code execution environment
  - Data visualization generation
  - Custom AI model fine-tuning

### Phase 3: Collaboration & Sharing (Next 2-3 months)

- [ ] **Team Collaboration**
  - Shared workspaces
  - Team chat rooms
  - Task assignment and tracking
  - Collaborative AI sessions

- [ ] **Content Sharing**
  - Share chat snippets
  - Export AI-generated content
  - Public task templates
  - Community task library

- [ ] **Integration Ecosystem**
  - Calendar integration
  - Email integration
  - Cloud storage sync
  - Third-party app connections

### Phase 4: Enterprise Features (Next 3-6 months)

- [ ] **Enterprise Security**
  - End-to-end encryption
  - SSO integration
  - Role-based access control
  - Audit logging

- [ ] **Advanced Analytics**
  - Usage analytics dashboard
  - AI performance metrics
  - Cost optimization
  - ROI tracking

- [ ] **Custom AI Models**
  - Domain-specific model training
  - Custom prompt templates
  - Brand voice customization
  - Industry-specific AI assistants

## 🎨 Design System

### Brand Identity

- **Vibe**: Round, funny, and cute design language
- **Theme**: Light theme only
- **Personality**: Friendly, approachable, and playful

### Typography System

- **Branding Font**: Clash Grotesk (Headings, Titles, Brand Elements)
- **Body Font**: Inter (Body text, descriptions, UI elements)

#### Font Weights & Styles

| Font Family   | Weight   | Usage Example        |
| ------------- | -------- | -------------------- |
| Clash Grotesk | Bold     | Main titles (H1)     |
| Clash Grotesk | Semibold | Section headers (H2) |
| Clash Grotesk | Medium   | Card titles (H3)     |
| Inter         | Regular  | Body text            |
| Inter         | Light    | Captions, hints      |

#### Sizing & Color Guidelines

- **Title (H1):**
  - Font: Clash Grotesk Bold
  - Size: 32–40px (mobile responsive)
  - Color: Primary text (`#1a1a1a`)
  - Usage: Main screen titles, hero sections
- **Section Header (H2):**
  - Font: Clash Grotesk Semibold
  - Size: 24–28px
  - Color: Primary text (`#1a1a1a`)
  - Usage: Section headers, modal titles
- **Card Title (H3):**
  - Font: Clash Grotesk Medium
  - Size: 18–20px
  - Color: Primary text (`#1a1a1a`)
  - Usage: Card and list item titles
- **Body Text:**
  - Font: Inter Regular
  - Size: 15–16px
  - Color: Secondary text (`#6b7280`)
  - Usage: Paragraphs, descriptions, chat messages
- **Caption/Hint:**
  - Font: Inter Light
  - Size: 12–13px
  - Color: Tertiary text (`#9ca3af`)
  - Usage: Helper text, timestamps, subtle info

**Note:**

- Titles should always be noticeably larger than body text.
- Body text should use a dimmer color (secondary or tertiary) to create clear hierarchy and visual separation from titles.
- All text should use generous line height for readability (1.3–1.5x font size).
- Avoid using all-caps except for small badges or labels.

### Color Palette

- **Primary/Branding**: Green (#8ee04e) - Main brand color
- **Secondary**: Light Green (#a7f26b) - Accent color
- **Background**: White (#ffffff) - Clean backgrounds
- **Surface**: Light Gray (#f8f9fa) - Card backgrounds
- **Text Primary**: Dark Gray (#1a1a1a) - Main text
- **Text Secondary**: Medium Gray (#6b7280) - Secondary text
- **Text Tertiary**: Light Gray (#9ca3af) - Subtle text
- **Success**: Green (#10b981) - Positive states
- **Warning**: Orange (#f59e0b) - Warning states
- **Error**: Red (#ef4444) - Error states
- **Info**: Blue (#3b82f6) - Information states

### Design Principles

- **Rounded Corners**: Generous border radius (16px-24px) for cards and buttons
- **Soft Shadows**: Subtle shadows for depth without harshness
- **Playful Icons**: Rounded, friendly iconography
- **Generous Spacing**: Comfortable padding and margins
- **Friendly Interactions**: Smooth animations and micro-interactions

### Components

- **Buttons**: Rounded with generous padding, friendly hover states
- **Cards**: Soft shadows, rounded corners, comfortable spacing
- **Inputs**: Rounded borders, friendly focus states
- **Navigation**: Tab-based with rounded active states
- **Modals**: Bottom sheet with handle and smooth animations
- **Headers**: Clean with rounded message indicators

### UI Implementation Best Practices

#### Typography Hierarchy

- **Section Titles**: Use `text-2xl font-clash-semibold` with `leading-tight` for main section headers
- **Card Titles**: Use `text-lg font-clash-medium` with `leading-tight` for card and list item titles
- **Body Text**: Use `text-base font-inter` for readable content
- **Subtitles/Descriptions**: Use `text-text-tertiary` for dimmer, secondary information
- **Line Heights**: Use `leading-tight` (1.1) for titles, `leading-normal` (1.3) for body text

#### Layout & Spacing

- **Card Layouts**: Emoji and title in one row, description in separate row below
- **Emoji Sizing**: Use `text-3xl` for prominent emojis in cards
- **Vertical Alignment**: Use `items-center` to align emoji with title text
- **Compact Spacing**: Use `mb-3` for card content sections, avoid excessive padding
- **Section Spacing**: Generous spacing between major sections (`mb-8`)

#### Visual Hierarchy

- **Title Prominence**: Section titles should be significantly larger than body text
- **Color Contrast**: Use `text-text-primary` for titles, `text-text-tertiary` for subtitles
- **Background Removal**: Remove backgrounds from emojis for cleaner look
- **Consistent Sizing**: Maintain consistent text sizes across similar elements

#### Component Patterns

- **Suggestion Cards**: Emoji + title row, description row, compact spacing
- **Section Headers**: Large bold titles with dimmer subtitles
- **Card Titles**: Medium weight, tight line height, primary color
- **Descriptive Text**: Always use tertiary color for secondary information

## 🔧 Development Guidelines

### Code Quality

- TypeScript for type safety
- ESLint + Prettier for code formatting
- Component-based architecture
- Proper error handling
- Performance optimization

### Testing Strategy

- Unit tests for utilities
- Component testing
- Integration testing
- E2E testing with Detox

### Performance Goals

- App launch time < 2 seconds
- Chat response time < 3 seconds
- Smooth 60fps animations
- Offline-first architecture

## 📊 Success Metrics

### User Engagement

- Daily Active Users (DAU)
- Session duration
- Tasks completed per session
- User retention rate

### Technical Performance

- App crash rate < 0.1%
- API response time < 2 seconds
- App store rating > 4.5
- User satisfaction score > 8/10

### Business Metrics

- User acquisition cost
- Lifetime value
- Conversion rate
- Revenue per user
- Premium subscription conversion rate

## 🚀 Deployment Strategy

### Development

- Expo Dev Client for rapid iteration
- Hot reloading for quick feedback
- Development builds for testing

### Staging

- TestFlight (iOS)
- Internal testing (Android)
- Beta user feedback collection

### Production

- App Store (iOS)
- Google Play Store (Android)
- Progressive Web App (PWA)

## 🔒 Security & Privacy

### Data Protection

- End-to-end encryption for chats
- Secure API key management
- GDPR compliance
- Data retention policies

### Privacy Features

- User data export
- Account deletion
- Privacy settings
- Transparent data usage

## 📈 Future Vision

### Long-term Goals (6-12 months)

1. **Market Leadership**: Become the go-to AI assistant app
2. **Global Expansion**: Support for 50+ languages
3. **Enterprise Adoption**: Large-scale business deployments
4. **AI Innovation**: Cutting-edge AI model integration

### Technology Evolution

- **AI Models**: Integration with latest AI models
- **Platform Expansion**: Web, desktop, and smart device apps
- **API Ecosystem**: Third-party integrations
- **AI Marketplace**: Custom AI model marketplace

---

## 📝 Development Notes

### Current Priorities

1. Complete Supabase integration
2. Implement user authentication
3. Add chat history persistence
4. Enhance error handling

### Known Issues

- API key exposed in client-side code (needs backend solution)
- Limited offline functionality
- No user data persistence
- Basic state management

### Next Sprint Goals

- [ ] Set up Supabase database schema
- [ ] Implement user authentication flow
- [ ] Add chat history storage
- [ ] Create user profile management

### Recently Completed Features

- ✅ **Daily Message Limit System**: Implemented 5-message daily limit with custom header indicator
  - Custom header component with message counter
  - AsyncStorage-based persistence
  - Visual indicators (green/amber/red)
  - Graceful limit handling with user alerts
  - Daily reset functionality

- ✅ **Enhanced Home Screen**: Redesigned home screen with three main sections
  - Chat input button that looks like a text field
  - Horizontal scrollable suggestions with 6 predefined cards
  - Horizontal scrollable recent chats with mock data
  - Task type badges and timestamps
  - Seamless navigation to chat with pre-filled prompts

- ✅ **Unified Custom Header System**: Consistent custom header across all app screens
  - Message limit indicator on all screens
  - Safe area support with pt-safe class
  - Interactive message counter with bottom sheet modal
  - Dynamic titles and back button logic
  - Settings button integration for easy access

- ✅ **Paywall & Premium Features**: Complete premium subscription system
  - Modern paywall screen with feature showcase and pricing plans
  - Bottom sheet modal for message limit information
  - Premium CTAs in chat when limit reached
  - Seamless navigation between CTAs and paywall screen

- ✅ **AI Model Selection**: Dynamic AI model selection system with premium access control
  - Model selection button in chat header replacing screen title
  - Comprehensive model selection modal with 4 available models
  - Premium model restrictions and upgrade CTAs
  - Real-time model switching with persistent storage
  - Enhanced OpenAI integration supporting dynamic model selection

- ✅ **Settings Screen**: Comprehensive settings and preferences management
  - Account and subscription management
  - AI model preferences and selection
  - App preferences and customization
  - Privacy and security settings
  - Support and about information

---

_Last Updated: [Current Date]_
_Version: 1.0.0_
_Status: Active Development_
