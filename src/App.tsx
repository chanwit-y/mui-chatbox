import MessageIcon from '@mui/icons-material/Message';
import { Box, Divider, Fab, Fade, Popover, ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';
import { ChatBox } from './ChatBox';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6a1b9a',
      light: '#9c4dcc',
      dark: '#4a148c',
    },
    secondary: {
      main: '#e91e63',
    },
    background: {
      default: '#0d082c',
      paper: '#1a1a2e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});



export function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <Fab size="medium" onClick={handleClick}>
          <MessageIcon />
        </Fab>
      </Box>

      <Popover
        id={id}
        open={open}
        // onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <ChatBox />
      </Popover>

     
    </ThemeProvider>
  );
}

export default App;
