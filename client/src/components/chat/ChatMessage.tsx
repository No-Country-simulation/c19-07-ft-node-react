import { Box, Typography } from "@mui/material";

interface ChatMessageProps {
  message: string;
  isSender: boolean;
}

export const ChatMessage = ({ message, isSender }: ChatMessageProps) => {
  return (
    <Box display="flex" justifyContent={isSender ? "end" : "start"}>
      <Box
        p={1}
        color="black"
        maxWidth="85%"
        bgcolor={isSender ? "secondary.main" : "#E6E6E6"}
        sx={{
          borderRadius: 2,
          borderBottomLeftRadius: !isSender ? 0 : 8,
          borderBottomRightRadius: isSender ? 0 : 8,
        }}
      >
        <Typography variant="body1">{message}</Typography>
      </Box>
    </Box>
  );
};
