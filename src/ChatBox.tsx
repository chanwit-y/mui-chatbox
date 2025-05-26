import { Avatar, Box, Typography } from "@mui/material";
import ChatHeader from "./ChatHeader";
import { ChatInput } from "./ChatInput";

import logo from "./asset/amigo-logo.png";


export const ChatBox = () => {
	return (
		<Box width={600} height={800} bgcolor="#0d082c">
			<ChatHeader>
				<Box display="flex" flexDirection="column" pt={1} pl={1} gap={1}>
					<Avatar src={logo} />
					<Typography variant="h6" component="div">
						Amigo ChatBot AI
					</Typography>
				</Box>
			</ChatHeader>
			<Box height="70%">Content</Box>
			<Box height="14%" px={2}  >
				<ChatInput onSend={() => { }} />
			</Box>
		</Box>
	)
}
