import React, { useState, ChangeEvent, KeyboardEvent, FormEvent } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';

// Define the props for the ChatInput component
interface ChatInputProps {
	/**
	 * Placeholder text for the input field.
	 * @default "Ask anything"
	 */
	placeholder?: string;
	/**
	 * Callback function triggered when the send button is clicked or Enter is pressed.
	 * @param message The current input value.
	 */
	onSend: (message: string) => void;
	/**
	 * Callback function triggered when the microphone button is clicked.
	 */
	onMicClick?: () => void;
	/**
	 * Initial value for the input field.
	 */
	initialValue?: string;
	/**
	 * Maximum width for the chat input component.
	 * @default "700px"
	 */
	maxWidth?: string | number;
	/**
	 * Background color of the chat input.
	 * @default "#301934" // A dark purple
	 */
	backgroundColor?: string;
	/**
	 * Text color for the input.
	 * @default "#E0E0E0"
	 */
	textColor?: string;
	/**
	 * Placeholder text color.
	 * @default "#B0B0B0"
	 */
	placeholderColor?: string;
	/**
	 * Icon color.
	 * @default "#C0C0C0"
	 */
	iconColor?: string;
}

// Main component for the chat input
export const ChatInput: React.FC<ChatInputProps> = ({
	placeholder = "Ask anything",
	onSend,
	onMicClick,
	initialValue = "",
	maxWidth = "700px",
	backgroundColor = "#242141", // Dark purple from previous example
	textColor = "#E0E0E0",
	placeholderColor = "#B0B0B0",
	iconColor = "#C0C0C0",
}) => {
	const [inputValue, setInputValue] = useState<string>(initialValue);

	// Handle input change
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	// Handle sending the message
	const handleSend = () => {
		if (inputValue.trim()) {
			onSend(inputValue);
			setInputValue(''); // Clear input after sending
		}
	};

	// Handle Enter key press for sending
	const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault(); // Prevent new line on Enter
			handleSend();
		}
	};

	// Handle microphone click
	const handleMicButtonClick = () => {
		if (onMicClick) {
			onMicClick();
		}
		// Example: console.log('Mic clicked');
	};

	// Handle form submission
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleSend();
	};

	return (
		<Paper
			component="form"
			elevation={3} // Adds a subtle shadow

			sx={{
				p: '8px 12px', // Padding inside the paper
				display: 'flex',
				alignItems: 'end',
				width: '100%', // Default to full width
				height: '100%', // Full height to fill the parent container
				maxWidth: maxWidth, // Max width for larger screens
				backgroundColor: backgroundColor,
				borderRadius: '5px', // Rounded corners
				boxSizing: 'border-box',
			}}
			onSubmit={handleSubmit}
		>
			<InputBase
				sx={{
					ml: 1,
					flex: 1, // Takes available horizontal space
					height: '100%', // InputBase wrapper is tall
					display: 'flex', // Makes InputBase a flex container
					alignItems: 'flex-end', // Aligns the inner <textarea> to the bottom of InputBase
					'& .MuiInputBase-input': { // Target the actual input/textarea element
					  width: '100%', // Textarea takes full width
					  color: textColor, // Apply text color directly to the input
					  fontSize: '1rem', // Apply font size directly to the input
					  textAlign: 'left', // Text inside textarea is left-aligned
					  paddingBottom: '2px', // Small padding to prevent text from touching the very bottom edge if needed
					  '&::placeholder': {
					    color: placeholderColor,
					    opacity: 1,
					  },
					},
				}}
				placeholder={placeholder}
				inputProps={{ 'aria-label': placeholder }}
				value={inputValue}
				onChange={handleInputChange}
				onKeyPress={handleKeyPress}
				multiline={true}
				maxRows={4}

			/>
			{onMicClick && ( // Conditionally render Mic button if onMicClick is provided
				<IconButton
					type="button"
					sx={{ p: '10px', color: iconColor }}
					aria-label="microphone"
					onClick={handleMicButtonClick}
				>
					<MicIcon />
				</IconButton>
			)}
			<IconButton
				type="submit"
				sx={{ p: '10px', color: iconColor }}
				aria-label="send message"
				disabled={!inputValue.trim()} // Disable if input is empty
			>
				<SendIcon />
			</IconButton>
		</Paper>
	);
};
