import Box from '@mui/material/Box';
import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

const ChatHeader = ({ children }: Props) => {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        background: 'linear-gradient(90deg, #4a148c, #6a1b9a)',
        color: '#ffffff',
        fontFamily: 'Roboto, sans-serif',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      }}
    >
      {children}
    </Box>
  );
};

export default ChatHeader;