
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Paper, Typography, useTheme, IconButton, Popover, Fade } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { FeedbackPopover } from './Feedback';
import { ChatReference } from './ChatReference';
import { Source } from './demoResponses';

interface ChatMessageProps {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isStreaming?: boolean;
  streamingSpeed?: number; // characters per chunk
  streamingDelay?: number; // milliseconds between chunks
  onStreamingComplete?: () => void;
  onFeedback?: (messageId: string, feedback: 'like' | 'dislike') => void;
  sources?: Source[]; // Reference sources for bot messages
}

interface ChunkState {
  displayedText: string;
  isComplete: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  id,
  text,
  sender,
  timestamp,
  isStreaming = false,
  streamingSpeed = 2,
  streamingDelay = 50,
  onStreamingComplete,
  onFeedback,
  sources
}) => {
  const theme = useTheme();
  const [chunkState, setChunkState] = useState<ChunkState>({
    displayedText: isStreaming ? '' : text,
    isComplete: !isStreaming
  });
  const [feedbackGiven, setFeedbackGiven] = useState<'like' | 'dislike' | null>(null);
  const [feedbackPopoverAnchor, setFeedbackPopoverAnchor] = useState<HTMLButtonElement | null>(null);

  // Chunking/streaming effect
  useEffect(() => {
    if (!isStreaming || chunkState.isComplete) return;

    let currentIndex = 0;
    const totalLength = text.length;

    const streamNextChunk = () => {
      if (currentIndex >= totalLength) {
        setChunkState(prev => ({ ...prev, isComplete: true }));
        onStreamingComplete?.();
        return;
      }

      const nextIndex = Math.min(currentIndex + streamingSpeed, totalLength);
      const newDisplayedText = text.slice(0, nextIndex);
      
      setChunkState(prev => ({
        ...prev,
        displayedText: newDisplayedText
      }));

      currentIndex = nextIndex;
      setTimeout(streamNextChunk, streamingDelay);
    };

    const timer = setTimeout(streamNextChunk, streamingDelay);
    
    return () => clearTimeout(timer);
  }, [text, isStreaming, streamingSpeed, streamingDelay, onStreamingComplete, chunkState.isComplete]);

  // Reset chunk state when text changes
  useEffect(() => {
    setChunkState({
      displayedText: isStreaming ? '' : text,
      isComplete: !isStreaming
    });
  }, [text, isStreaming]);

  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  const handleFeedback = useCallback((feedback: 'like' | 'dislike') => {
    if (feedback === 'like') {
      setFeedbackGiven(feedback);
      onFeedback?.(id, feedback);
    }
    // For dislike, we'll handle it through the popover
  }, [id, onFeedback]);

  const handleDislikeClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setFeedbackPopoverAnchor(event.currentTarget);
  }, []);

  const handleFeedbackPopoverClose = useCallback(() => {
    setFeedbackPopoverAnchor(null);
  }, []);

  const handleFeedbackSubmit = useCallback((feedbackData: any) => {
    setFeedbackGiven('dislike');
    onFeedback?.(id, 'dislike');
    setFeedbackPopoverAnchor(null);
    console.log('Detailed feedback received:', feedbackData);
  }, [id, onFeedback]);

  return (
    <Box
      display="flex"
      justifyContent={sender === 'user' ? 'flex-end' : 'flex-start'}
      mb={1}
    >
      <Paper
        elevation={1}
        sx={{
          px: 2,
          py: 1,
          maxWidth: { xs: '85%', sm: '75%', md: '70%' },
          borderRadius: 2,
          backgroundColor: sender === 'user' 
            ? theme.palette.primary.main 
            : theme.palette.background.paper,
          color: sender === 'user' 
            ? theme.palette.primary.contrastText 
            : theme.palette.text.primary,
          wordWrap: 'break-word',
          position: 'relative'
        }}
      >
        {sender === 'user' ? (
          <Typography variant="body2">
            {chunkState.displayedText}
          </Typography>
        ) : (
          <Box
            sx={{
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                color: theme.palette.text.primary,
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(0.5),
                fontWeight: 600,
              },
              '& h1': { fontSize: '1.5rem' },
              '& h2': { fontSize: '1.25rem' },
              '& h3': { fontSize: '1.1rem' },
              '& p': {
                marginTop: 0,
                marginBottom: theme.spacing(1),
                lineHeight: 1.6,
              },
              '& p:last-child': {
                marginBottom: 0,
              },
              '& ul, & ol': {
                marginTop: theme.spacing(0.5),
                marginBottom: theme.spacing(1),
                paddingLeft: theme.spacing(2),
              },
              '& li': {
                marginBottom: theme.spacing(0.25),
              },
              '& blockquote': {
                borderLeft: `3px solid ${theme.palette.primary.main}`,
                paddingLeft: theme.spacing(1),
                marginLeft: 0,
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
                fontStyle: 'italic',
                opacity: 0.8,
              },
              '& code': {
                backgroundColor: theme.palette.action.hover,
                padding: '2px 4px',
                borderRadius: '3px',
                fontSize: '0.875em',
                fontFamily: 'monospace',
              },
              '& pre': {
                backgroundColor: theme.palette.action.hover,
                padding: theme.spacing(1),
                borderRadius: theme.spacing(0.5),
                overflow: 'auto',
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
              },
              '& pre code': {
                backgroundColor: 'transparent',
                padding: 0,
              },
              '& table': {
                borderCollapse: 'collapse',
                width: '100%',
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
              },
              '& th, & td': {
                border: `1px solid ${theme.palette.divider}`,
                padding: theme.spacing(0.5),
                textAlign: 'left',
              },
              '& th': {
                backgroundColor: theme.palette.action.hover,
                fontWeight: 600,
              },
              '& a': {
                color: theme.palette.primary.main,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
              '& img': {
                maxWidth: '100%',
                height: 'auto',
                borderRadius: theme.spacing(0.5),
                marginTop: theme.spacing(0.5),
                marginBottom: theme.spacing(0.5),
              },
              '& hr': {
                border: 'none',
                borderTop: `1px solid ${theme.palette.divider}`,
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
              },
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                // Custom component for better code block styling
                code: ({ node, className, children, ...props }: any) => {
                  const inline = !className;
                  return !inline ? (
                    <Box
                      component="pre"
                      sx={{
                        backgroundColor: theme.palette.action.hover,
                        padding: theme.spacing(1),
                        borderRadius: theme.spacing(0.5),
                        overflow: 'auto',
                        marginTop: theme.spacing(1),
                        marginBottom: theme.spacing(1),
                        fontSize: '0.875rem',
                        fontFamily: 'monospace',
                      }}
                    >
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </Box>
                  ) : (
                    <Box
                      component="code"
                      sx={{
                        backgroundColor: theme.palette.action.hover,
                        padding: '2px 4px',
                        borderRadius: '3px',
                        fontSize: '0.875em',
                        fontFamily: 'monospace',
                      }}
                      {...props}
                    >
                      {children}
                    </Box>
                  );
                },
              }}
            >
              {chunkState.displayedText}
            </ReactMarkdown>
          </Box>
        )}
        
        {/* Streaming indicator */}
        {isStreaming && !chunkState.isComplete && (
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: '8px',
              height: '16px',
              backgroundColor: theme.palette.text.primary,
              marginLeft: '2px',
              animation: 'blink 1s infinite',
              '@keyframes blink': {
                '0%, 50%': { opacity: 1 },
                '51%, 100%': { opacity: 0 },
              },
            }}
          />
        )}

	{/* Show references only for bot messages with sources */}
	{sender === 'bot' && sources && sources.length > 0 && (
		<Fade 
			in={chunkState.isComplete} 
			timeout={800}
			unmountOnExit
		>
			<Box>
				<ChatReference sources={sources} />
			</Box>
		</Fade>
	)}
        
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={0.5}>
          <Typography 
            variant="caption" 
            sx={{ 
              opacity: 0.7,
              fontSize: '0.75rem'
            }}
          >
            {formatTime(timestamp)}
          </Typography>
          
          {/* Show feedback buttons only for bot messages when streaming is complete */}
          {sender === 'bot' && chunkState.isComplete && (
            <Box display="flex" gap={0.5}>
              <IconButton
                size="small"
                onClick={() => handleFeedback('like')}
                sx={{
                  color: feedbackGiven === 'like' 
                    ? theme.palette.primary.main 
                    : theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: `${theme.palette.primary.main}20`,
                  },
                  padding: '4px',
                }}
              >
                <ThumbUp sx={{ fontSize: '16px' }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleDislikeClick}
                sx={{
                  color: feedbackGiven === 'dislike' 
                    ? theme.palette.error.main 
                    : theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.error.main,
                    backgroundColor: `${theme.palette.error.main}20`,
                  },
                  padding: '4px',
                }}
              >
                <ThumbDown sx={{ fontSize: '16px' }} />
              </IconButton>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Feedback Popover */}
      <Popover
        open={Boolean(feedbackPopoverAnchor)}
        anchorEl={feedbackPopoverAnchor}
        onClose={handleFeedbackPopoverClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <FeedbackPopover
          onSubmit={handleFeedbackSubmit}
          onCancel={handleFeedbackPopoverClose}
        />
      </Popover>
    </Box>
  );
};
