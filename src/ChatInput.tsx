import React, { useState, useCallback, ChangeEvent, KeyboardEvent, FormEvent } from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

interface ChatInputProps {
	placeholder?: string;
	onSend: (message: string) => void;
	initialValue?: string;
	maxWidth?: string | number;
	backgroundColor?: string;
	textColor?: string;
	placeholderColor?: string;
	iconColor?: string;
	disabled?: boolean;
	loading?: boolean;
	maxLength?: number;
	minRows?: number;
	maxRows?: number;
	showCharacterCount?: boolean;
	customSx?: SxProps<Theme>;
	autoFocus?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
	placeholder = "Ask anything",
	onSend,
	initialValue = "",
	maxWidth = "700px",
	backgroundColor = "#242141",
	textColor = "#E0E0E0",
	placeholderColor = "#B0B0B0",
	iconColor = "#C0C0C0",
	disabled = false,
	loading = false,
	maxLength,
	minRows = 1,
	maxRows = 4,
	showCharacterCount = false,
	customSx,
	autoFocus = false,
}) => {
	const [inputValue, setInputValue] = useState<string>(initialValue);

	const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		if (!maxLength || newValue.length <= maxLength) {
			setInputValue(newValue);
		}
	}, [maxLength]);

	const handleSend = useCallback(() => {
		const trimmedValue = inputValue.trim();
		if (trimmedValue && !disabled && !loading) {
			onSend(trimmedValue);
			setInputValue('');
		}
	}, [inputValue, onSend, disabled, loading]);

	const handleKeyPress = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSend();
		}
	}, [handleSend]);


	const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleSend();
	}, [handleSend]);

	const isSubmitDisabled = !inputValue.trim() || disabled || loading;
	const characterCount = inputValue.length;
	const isOverLimit = maxLength ? characterCount > maxLength : false;

	return (
		<Paper
			component="form"
			elevation={3}
			sx={{
				p: '8px 12px',
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				height: '100%',
				maxWidth: maxWidth,
				backgroundColor: backgroundColor,
				borderRadius: '5px',
				boxSizing: 'border-box',
				opacity: disabled ? 0.6 : 1,
				transition: 'opacity 0.2s ease-in-out',
				border: '1px solid #817e98',
				...customSx,
			}}
			onSubmit={handleSubmit}
			role="search"
			aria-label="Chat input form"
		>
			<Box display='flex' alignItems='end' width='100%' height='100%' justifyContent='space-between'>
				<InputBase
					sx={{
						ml: 1,
						flex: 1,
						height: '100%',
						display: 'flex',
						alignItems: 'flex-end',
						'& .MuiInputBase-input': {
							width: '100%',
							color: textColor,
							fontSize: '1rem',
							textAlign: 'left',
							paddingBottom: '2px',
							resize: 'none',
							'&::placeholder': {
								color: placeholderColor,
								opacity: 1,
							},
							'&:disabled': {
								color: `${textColor}80`,
							},
						},
					}}
					placeholder={placeholder}
					inputProps={{
						'aria-label': placeholder,
						'aria-describedby': showCharacterCount ? 'character-count' : undefined,
						maxLength: maxLength,
					}}
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyPress}
					multiline
					minRows={minRows}
					maxRows={maxRows}
					disabled={disabled || loading}
					autoFocus={autoFocus}
				/>
				
				<IconButton
					type="submit"
					sx={{
						p: '10px',
						color: iconColor,
						'&:hover': {
							backgroundColor: `${iconColor}20`,
						},
						'&:disabled': {
							color: `${iconColor}50`,
						},
					}}
					aria-label={loading ? 'Sending message...' : 'Send message'}
					disabled={isSubmitDisabled}
					tabIndex={0}
				>
					{loading ? (
						<CircularProgress 
							size={20} 
							sx={{ color: iconColor }} 
						/>
					) : (
						<SendIcon />
					)}
				</IconButton>
			</Box>
			{showCharacterCount && maxLength && (
				<Box
					id="character-count"
					mt={0.5}
					textAlign='right'
					fontSize='0.75rem'
					color={isOverLimit ? '#ff6b6b' : placeholderColor}
					aria-live="polite"
				>
					{characterCount}/{maxLength}
				</Box>
			)}
		</Paper>
	);
};
