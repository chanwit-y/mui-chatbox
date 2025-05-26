import MessageIcon from '@mui/icons-material/Message';
import { Box, Fab, Fade, Popover } from '@mui/material';
import { useState } from 'react';
import { ChatBox } from './ChatBox';



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
    <>
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
    </>
  );
}

export default App;
