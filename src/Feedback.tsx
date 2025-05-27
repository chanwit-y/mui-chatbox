import React, { useState } from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Button,
  Paper,
  useTheme,
  Divider
} from '@mui/material';

interface FeedbackPopoverProps {
  onSubmit?: (feedbackData: FeedbackData) => void;
  onCancel?: () => void;
}

interface FeedbackData {
  contentIssue: string;
  details: string;
}

export const FeedbackPopover: React.FC<FeedbackPopoverProps> = ({
  onSubmit,
  onCancel
}) => {
  const theme = useTheme();
  const [contentIssue, setContentIssue] = useState<string>('');
  const [details, setDetails] = useState<string>('');

  const handleSubmit = () => {
    if (contentIssue && details.trim()) {
      onSubmit?.({
        contentIssue,
        details: details.trim()
      });
      // Reset form
      setContentIssue('');
      setDetails('');
    }
  };

  const handleCancel = () => {
    // Reset form
    setContentIssue('');
    setDetails('');
    onCancel?.();
  };

  const isSubmitDisabled = !contentIssue || !details.trim();

  return (
    <Paper
      elevation={3}
      sx={{
        width: 400,
        p: 3,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" component="h2" mb={2} fontWeight={600}>
        Give Feedback
      </Typography>
      
      <Divider sx={{ mb: 2 }} />
      
      <Typography variant="body2" color="text.secondary" mb={2}>
        Send detailed feedback
      </Typography>
      
      <Typography variant="body2" color="text.secondary" mb={1}>
        Let us know what we're getting right and what we can improve.
      </Typography>
      
      <Typography variant="body2" fontWeight={500} mb={1}>
        The content is*
      </Typography>
      
      <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
        <RadioGroup
          value={contentIssue}
          onChange={(e) => setContentIssue(e.target.value)}
        >
          <FormControlLabel
            value="inaccurate"
            control={<Radio size="small" />}
            label={
              <Typography variant="body2">
                Inaccurate
              </Typography>
            }
          />
          <FormControlLabel
            value="offensive"
            control={<Radio size="small" />}
            label={
              <Typography variant="body2">
                Offensive or inappropriate
              </Typography>
            }
          />
          <FormControlLabel
            value="lorem"
            control={<Radio size="small" />}
            label={
              <Typography variant="body2">
                Lorem ipsum text
              </Typography>
            }
          />
          <FormControlLabel
            value="other"
            control={<Radio size="small" />}
            label={
              <Typography variant="body2">
                Other
              </Typography>
            }
          />
        </RadioGroup>
      </FormControl>
      
      <Typography variant="body2" fontWeight={500} mb={1}>
        What Went wrong?
      </Typography>
      
      <TextField
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        placeholder="Please do not include any personal information"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            backgroundColor: theme.palette.background.default,
          }
        }}
      />
      
      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{
            color: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            '&:hover': {
              borderColor: theme.palette.text.secondary,
            }
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            }
          }}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
};