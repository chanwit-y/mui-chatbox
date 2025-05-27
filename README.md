# MUI ChatBox - Advanced Chat Interface Component

A modern, feature-rich chat interface built with React, TypeScript, and Material-UI. Supports markdown rendering, streaming responses, and user feedback collection.

![ChatBox Demo](https://img.shields.io/badge/React-18+-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue) ![Material--UI](https://img.shields.io/badge/Material--UI-7.0+-purple)

## ✨ Features

- 🎨 **Dark Theme Support** - Beautiful dark mode with purple accent colors
- 📝 **Markdown Rendering** - Full GitHub Flavored Markdown support with syntax highlighting
- ⚡ **Streaming Animation** - Character-by-character text streaming for realistic chat experience
- 👍 **User Feedback** - Like/unlike buttons with detailed feedback collection
- 📱 **Responsive Design** - Adapts to different screen sizes
- 🔄 **Auto-scroll** - Automatically follows conversation during streaming
- 🎭 **Message Bubbles** - Distinct styling for user and bot messages
- 💬 **Demo Responses** - Built-in demo responses for testing

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mui-charbox

# Install dependencies
npm install

# Start development server
npm start
```

### Basic Usage

```tsx
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { ChatBox } from './ChatBox';

const darkTheme = createTheme({
  palette: { mode: 'dark' }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <ChatBox />
    </ThemeProvider>
  );
}
```

## 📦 Dependencies

```json
{
  "@mui/material": "^7.1.0",
  "@mui/icons-material": "^7.1.0",
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.0",
  "react-markdown": "^10.1.0",
  "remark-gfm": "^4.0.1",
  "rehype-raw": "^7.0.0"
}
```

## 🎯 ChatBox Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number \| string` | `600` | Width of the chat container |
| `height` | `number \| string` | `800` | Height of the chat container |
| `onMessageSend` | `(message: string) => void` | `undefined` | Callback when user sends a message |
| `initialMessages` | `Message[]` | `[]` | Initial messages to display |

## 💬 Message Interface

```tsx
interface Message {
  id: string;           // Unique identifier
  text: string;         // Message content (supports markdown)
  sender: 'user' | 'bot'; // Message sender type
  timestamp: Date;      // When the message was sent
  isStreaming?: boolean; // Enable streaming animation
}
```

## 🔧 Advanced Usage

### Custom Messages with Streaming

```tsx
import React, { useState } from 'react';
import { ChatBox } from './ChatBox';

function MyChat() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: '# Welcome! 👋\n\nI can help you with:\n- **Code examples**\n- `Programming questions`\n- General assistance',
      sender: 'bot',
      timestamp: new Date(),
      isStreaming: true
    }
  ]);

  const handleMessageSend = (message: string) => {
    console.log('User sent:', message);
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Add bot response with streaming
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: `## Response to: "${message}"\n\nThanks for your message! Here's a **detailed** response with some \`code\`:\n\n\`\`\`javascript\nfunction respond(input) {\n  return \`Processing: \${input}\`;\n}\n\`\`\``,
        sender: 'bot',
        timestamp: new Date(),
        isStreaming: true
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <ChatBox
      width={700}
      height={900}
      initialMessages={messages}
      onMessageSend={handleMessageSend}
    />
  );
}
```

### Markdown Features

The ChatBox supports rich markdown content:

```markdown
# Headers
## Subheaders

**Bold text** and *italic text*

- Bullet lists
- With multiple items

1. Numbered lists
2. Are also supported

\`inline code\` and code blocks:

\`\`\`javascript
function example() {
  return "Hello World!";
}
\`\`\`

[Links](https://example.com) and **tables**:

| Feature | Status |
|---------|--------|
| Markdown | ✅ |
| Streaming | ✅ |
| Tables | ✅ |

> Blockquotes for important information

---

Horizontal rules for separation
```

### Popover Integration

```tsx
import { Popover, Fab } from '@mui/material';
import { Message } from '@mui/icons-material';

function FloatingChat() {
  const [anchorEl, setAnchorEl] = useState(null);
  
  return (
    <>
      <Fab 
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <Message />
      </Fab>
      
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <ChatBox />
      </Popover>
    </>
  );
}
```

## 🎨 Custom Theme

```tsx
import { createTheme } from '@mui/material';

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6a1b9a',      // Purple primary
      light: '#9c4dcc',
      dark: '#4a148c',
    },
    secondary: {
      main: '#e91e63',      // Pink secondary
    },
    background: {
      default: '#0d082c',   // Dark blue background
      paper: '#1a1a2e',     // Dark grey for message bubbles
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});
```

## 🔄 Streaming Configuration

### ChatMessage Streaming Props

```tsx
<ChatMessage
  streamingSpeed={3}        // Characters per chunk (default: 2)
  streamingDelay={40}       // Milliseconds between chunks (default: 50)
  onStreamingComplete={() => {
    console.log('Message finished streaming');
  }}
/>
```

### Performance Tips

- **Fast Streaming**: `streamingSpeed={5}, streamingDelay={20}`
- **Slow Streaming**: `streamingSpeed={1}, streamingDelay={100}`
- **Balanced**: `streamingSpeed={3}, streamingDelay={40}` (recommended)

## 👍 Feedback System

### Handling User Feedback

```tsx
const handleFeedback = (messageId: string, feedback: 'like' | 'dislike') => {
  console.log(`Message ${messageId} received ${feedback}`);
  
  // Analytics
  analytics.track('message_feedback', {
    messageId,
    feedback,
    timestamp: new Date()
  });
  
  // Database update
  updateMessageRating(messageId, feedback);
};
```

### Feedback Features

- **Like Button**: Direct positive feedback
- **Unlike Button**: Opens detailed feedback form
- **Feedback Form**: Collects specific issues and detailed comments
- **State Persistence**: Remembers user's feedback choice

## 🏗️ Component Architecture

```
src/
├── ChatBox.tsx          # Main chat container
├── ChatMessage.tsx      # Individual message component
├── ChatHeader.tsx       # Chat header with avatar
├── ChatInput.tsx        # Message input field
├── Feedback.tsx         # Feedback collection form
└── asset/
    └── amigo-logo.png   # Chat bot avatar
```

### Component Hierarchy

```
ChatBox
├── ChatHeader
│   └── Avatar + Title
├── Messages Container (with auto-scroll)
│   └── ChatMessage[]
│       ├── Message Bubble
│       ├── ReactMarkdown Content
│       ├── Streaming Animation
│       ├── Timestamp
│       └── Feedback Buttons
│           └── FeedbackPopover
└── ChatInput
    └── Input Field + Send Button
```

## 📱 Responsive Breakpoints

```scss
// Message bubbles adapt to screen size
xs: maxWidth: '85%'  // Mobile
sm: maxWidth: '75%'  // Tablet
md: maxWidth: '70%'  // Desktop

// Container minimum widths
xs: minWidth: 300px  // Mobile
sm: minWidth: 400px  // Tablet
md: minWidth: 600px  // Desktop
```

## 🧪 Demo Responses

The ChatBox includes 5 built-in demo responses:

1. **General Introduction** - Welcome message with capabilities
2. **Programming Help** - Code examples and language support
3. **Markdown Demo** - Showcases all markdown features
4. **Data Analytics** - Python/SQL code examples
5. **Web Development** - React/JavaScript examples

## 🚀 Available Scripts

### Development

```bash
npm start          # Start development server
npm test           # Run tests
npm run build      # Build for production
npm run eject      # Eject from Create React App
```

### Usage in Your Project

```bash
# Copy components to your project
cp src/ChatBox.tsx your-project/src/
cp src/ChatMessage.tsx your-project/src/
cp src/ChatHeader.tsx your-project/src/
cp src/ChatInput.tsx your-project/src/
cp src/Feedback.tsx your-project/src/
```

## 🌐 Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 📊 Performance Considerations

- **Message Virtualization**: Consider for 1000+ messages
- **Markdown Parsing**: Heavy content may need optimization
- **Streaming Frequency**: Adjust based on content length
- **Auto-scroll**: Pauses when user manually scrolls

## 🛠️ Customization Examples

### Custom Message Types

```tsx
// Add custom message properties
interface ExtendedMessage extends Message {
  messageType?: 'text' | 'image' | 'file';
  metadata?: any;
}
```

### Custom Styling

```tsx
// Override message bubble colors
const CustomChatMessage = styled(ChatMessage)(({ theme }) => ({
  '& .user-message': {
    backgroundColor: theme.palette.info.main,
  },
  '& .bot-message': {
    backgroundColor: theme.palette.success.main,
  },
}));
```

## 🔧 Troubleshooting

### Common Issues

1. **Markdown not rendering**: Ensure `react-markdown` is installed
2. **Icons missing**: Install `@mui/icons-material`
3. **Streaming not working**: Check `isStreaming` prop
4. **Theme not applied**: Wrap with `ThemeProvider`

### Debug Mode

```tsx
// Enable console logging for development
const ChatBoxWithDebug = (props) => {
  const handleDebugMessage = (msg) => {
    console.log('Message sent:', msg);
  };
  
  return <ChatBox {...props} onMessageSend={handleDebugMessage} />;
};
```

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

Built with ❤️ using React, TypeScript, and Material-UI

**Live Demo**: Run `npm start` to see the ChatBox in action!