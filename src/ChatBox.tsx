import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import ChatHeader from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";

import logo from "./asset/amigo-logo.png";

// Demo responses with markdown content
const demoResponses = [
	`# Hello! 👋

I'm **Amigo ChatBot AI**, your friendly assistant. I can help you with various tasks including:

## What I can do:
- Answer questions on a wide range of topics
- Help with **coding** and \`programming\`
- Provide explanations and tutorials
- Assist with writing and analysis

> Feel free to ask me anything! I'm here to help.

### Example Code:
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

What would you like to know about today?`,

	`## Programming Help 💻

I'd be happy to help you with programming! Here are some areas I can assist with:

### Languages I support:
| Language | Frameworks | Use Cases |
|----------|------------|-----------|
| JavaScript | React, Node.js | Web development |
| Python | Django, Flask | Data science, AI |
| TypeScript | Angular, Next.js | Enterprise apps |
| Java | Spring Boot | Backend services |

#### Common Tasks:
1. **Code review** and optimization
2. **Debugging** assistance  
3. **Architecture** planning
4. **Best practices** guidance

\`\`\`python
# Example: Simple Python function
def calculate_fibonacci(n):
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)
\`\`\`

What specific programming topic would you like help with?`,

	`## Markdown Features Demo 📝

This response showcases various markdown capabilities:

### Text Formatting:
- **Bold text**
- *Italic text*
- \`inline code\`
- ~~strikethrough~~

### Lists:
#### Ordered List:
1. First item
2. Second item
3. Third item

#### Unordered List:
- Bullet point one
- Bullet point two
  - Nested item
  - Another nested item

### Blockquotes:
> "The best way to predict the future is to create it." - Peter Drucker

### Code Blocks:
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const createUser = (userData: User): Promise<User> => {
  return fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  }).then(res => res.json());
};
\`\`\`

### Links and Images:
Check out [React Documentation](https://reactjs.org) for more info!

---

What else would you like to explore?`,

	`## Data & Analytics 📊

I can help you with data-related questions! Here's what I cover:

### Data Science Topics:
- **Machine Learning** algorithms
- **Statistical analysis**
- **Data visualization**
- **Database** design and queries

#### Sample Data Analysis:
\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt

# Load and analyze data
df = pd.read_csv('data.csv')
summary_stats = df.describe()

# Create visualization
plt.figure(figsize=(10, 6))
plt.plot(df['date'], df['value'])
plt.title('Data Trends Over Time')
plt.xlabel('Date')
plt.ylabel('Value')
plt.show()
\`\`\`

### Database Queries:
\`\`\`sql
SELECT 
  u.name,
  COUNT(o.id) as order_count,
  SUM(o.total) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.created_at >= '2024-01-01'
GROUP BY u.id, u.name
ORDER BY total_spent DESC;
\`\`\`

What data challenge are you working on?`,

	`## Web Development 🌐

Let me help you with web development concepts:

### Frontend Technologies:
#### React Ecosystem:
- **React 18** with concurrent features
- **Next.js** for SSR/SSG
- **TypeScript** for type safety
- **Tailwind CSS** for styling

#### Modern Development:
\`\`\`jsx
import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};
\`\`\`

### Backend APIs:
\`\`\`javascript
// Express.js API endpoint
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
\`\`\`

What aspect of web development interests you most?`
];

const getRandomResponse = () => {
	return demoResponses[Math.floor(Math.random() * demoResponses.length)];
};

interface Message {
	id: string;
	text: string;
	sender: 'user' | 'bot';
	timestamp: Date;
	isStreaming?: boolean;
}

interface ChatBoxProps {
	width?: number | string;
	height?: number | string;
	onMessageSend?: (message: string) => void;
	initialMessages?: Message[];
}


export const ChatBox: React.FC<ChatBoxProps> = ({
	width = 600,
	height = 800,
	onMessageSend,
	initialMessages = []
}) => {
	const theme = useTheme();
	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	// Scroll to bottom function
	const scrollToBottom = useCallback(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, []);

	// Auto-scroll when messages change
	useEffect(() => {
		scrollToBottom();
	}, [messages, scrollToBottom]);

	// Auto-scroll during streaming (more frequent updates)
	useEffect(() => {
		const hasStreamingMessage = messages.some(msg => msg.isStreaming);
		
		if (hasStreamingMessage) {
			const interval = setInterval(() => {
				scrollToBottom();
			}, 100); // Scroll every 100ms during streaming
			
			return () => clearInterval(interval);
		}
	}, [messages, scrollToBottom]);

	const handleFeedback = useCallback((messageId: string, feedback: 'like' | 'dislike') => {
		console.log(`Message ${messageId} received ${feedback} feedback`);
		// Here you can implement your feedback handling logic
		// e.g., send to analytics, update database, etc.
	}, []);

	const handleSendMessage = useCallback((messageText: string) => {
		const newMessage: Message = {
			id: Date.now().toString(),
			text: messageText,
			sender: 'user',
			timestamp: new Date()
		};

		setMessages(prev => [...prev, newMessage]);
		onMessageSend?.(messageText);

		// Auto-generate demo response after a short delay
		setTimeout(() => {
			const botResponse: Message = {
				id: (Date.now() + 1).toString(),
				text: getRandomResponse(),
				sender: 'bot',
				timestamp: new Date(),
				isStreaming: true
			};
			setMessages(prev => [...prev, botResponse]);
		}, 1000); // 1 second delay to simulate processing
	}, [onMessageSend]);


	return (
		<Box 
			sx={{
				width: width,
				height: height,
				minWidth: { xs: 300, sm: 400, md: 600 },
				maxWidth: '100%',
				bgcolor: theme.palette.background.default,
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
				borderRadius: 2,
				boxShadow: 3
			}}
		>
			<ChatHeader>
				<Box display="flex" flexDirection="column" pt={1} pl={1} gap={1}>
					<Avatar src={logo} />
					<Typography variant="h6" component="div">
						Amigo ChatBot AI
					</Typography>
				</Box>
			</ChatHeader>
			
			<Box 
				ref={scrollContainerRef}
				flex={1}
				p={2}
				overflow="auto"
				display="flex"
				flexDirection="column"
				gap={1}
			>
				{messages.length === 0 ? (
					<Box 
						display="flex" 
						alignItems="center" 
						justifyContent="center" 
						height="100%"
						color={theme.palette.text.secondary}
					>
						<Typography variant="body1">
							Start a conversation with Amigo ChatBot AI
						</Typography>
					</Box>
				) : (
					messages.map(message => (
						<ChatMessage 
							key={message.id} 
							id={message.id}
							text={message.text}
							sender={message.sender}
							timestamp={message.timestamp}
							isStreaming={message.isStreaming}
							streamingSpeed={3}
							streamingDelay={40}
							onStreamingComplete={() => {
								// Update message to mark streaming as complete
								setMessages(prev => 
									prev.map(msg => 
										msg.id === message.id 
											? { ...msg, isStreaming: false }
											: msg
									)
								);
							}}
							onFeedback={handleFeedback}
						/>
					))
				)}
				{/* Invisible element to scroll to */}
				<div ref={messagesEndRef} />
			</Box>
			
			<Box px={2} pb={2}>
				<ChatInput onSend={handleSendMessage} />
			</Box>
		</Box>
	);
};
