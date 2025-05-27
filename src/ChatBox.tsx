import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import ChatHeader from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { getRandomResponse } from "./demoResponses";

import logo from "./asset/amigo-logo.png";


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
	const [isLoading, setIsLoading] = useState<boolean>(false);
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

		// Set loading state
		setIsLoading(true);

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
			setIsLoading(false); // Stop loading when response is added
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
				<ChatInput onSend={handleSendMessage} loading={isLoading} />
			</Box>
		</Box>
	);
};
