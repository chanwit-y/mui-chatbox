import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Link
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Source } from './demoResponses';

interface ChatReferenceProps {
  sources: Source[];
  title?: string;
}

export const ChatReference: React.FC<ChatReferenceProps> = ({ 
  sources, 
  title = "Reference" 
}) => {
  const theme = useTheme();
  const [expandedPanels, setExpandedPanels] = useState<Set<number>>(new Set());

  const handleAccordionChange = (panelIndex: number) => (
    _event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    const newExpandedPanels = new Set(expandedPanels);
    if (isExpanded) {
      newExpandedPanels.add(panelIndex);
    } else {
      newExpandedPanels.delete(panelIndex);
    }
    setExpandedPanels(newExpandedPanels);
  };

  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        mt: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          backgroundColor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Sources */}
      <Box>
        {sources.map((source, index) => (
          <Accordion
            key={index}
            expanded={expandedPanels.has(index)}
            onChange={handleAccordionChange(index)}
            sx={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
              '&:before': {
                display: 'none',
              },
              '&.Mui-expanded': {
                margin: 0,
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: '1.2rem',
                  }}
                />
              }
              sx={{
                px: 2,
                py: 1,
                minHeight: 'auto',
                '&.Mui-expanded': {
                  minHeight: 'auto',
                },
                '& .MuiAccordionSummary-content': {
                  margin: '8px 0',
                  '&.Mui-expanded': {
                    margin: '8px 0',
                  },
                },
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    lineHeight: 1.4,
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {source.title}
                </Typography>
                
                {/* Relevance Score */}
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.75rem',
                    mt: 0.5,
                    display: 'block',
                  }}
                >
                  Relevance: {(source.relevance_score * 100).toFixed(1)}%
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails
              sx={{
                px: 2,
                py: 1,
                pt: 0,
                borderTop: 'none',
              }}
            >
              <Box>
                {/* Content */}
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    mb: 1.5,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {source.content}
                </Typography>

                {/* Source Link */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  <Link
                    href={source.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: '0.75rem',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                      wordBreak: 'break-all',
                      maxWidth: '70%',
                    }}
                  >
                    {source.path}
                  </Link>

                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      backgroundColor: theme.palette.action.hover,
                      px: 1,
                      py: 0.25,
                      borderRadius: 0.5,
                    }}
                  >
                    {source.media_type}
                  </Typography>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};