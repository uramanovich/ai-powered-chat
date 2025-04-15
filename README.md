# Building Your First AI-Powered Chat Widget with React & OpenAI

## Tech Stack

- Next.js - framework
- Tailwind CSS - styles
- lucide-react - icons
- Zod - schema validation
- TypeScript
- OpenAI (ChatGPT)

🚀 Getting Started
Prerequisites

Node.js 18.0 or later
npm or yarn
OpenAI API key

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-chat-widget.git
cd ai-chat-widget
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Add your OpenAI API key to .env.local:

```
OPENAI_API_KEY=your_api_key_here
```

5. Start the development server:

```bash
npm run dev
```

Visit http://localhost:3000 to see the chat widget in action.

# AI Chat Widget with Next.js

A modern, responsive chat interface built with Next.js 14 and OpenAI API. This project demonstrates how to create a production-ready AI chat widget that you can integrate into your applications.

![Chat Widget Demo](/api/placeholder/800/400)

## 🌟 Features

- Real-time chat interface with AI responses
- Responsive design using Tailwind CSS
- TypeScript for type safety
- OpenAI API integration
- Loading states and error handling
- Rate limiting protection
- Easy to customize and extend

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-chat-widget.git
cd ai-chat-widget
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Add your OpenAI API key to `.env.local`:

```
OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to see the chat widget in action.

## Usage

Import the chat widget into your Next.js application:

```tsx
import { ChatWidget } from "@/app/components/chat-widget/chat-widget.component";

export default function YourPage() {
  return (
    <div>
      <ChatWidget />
    </div>
  );
}
```

## Configuration

Customize the chat widget by modifying:

- `tailwind.config.js` for styling
- `lib/openai.ts` for API settings
- Environment variables for API keys and endpoints

## API Reference

The chat API endpoint accepts POST requests at `/api/chat`:

```typescript
POST /api/chat
Content-Type: application/json

{
  "message": "Your message here"
}
```

## 🔒 Security Considerations

- Implement authentication for production use
- Set up proper rate limiting
- Secure your API keys
- Validate user input
- Consider implementing message filtering

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
