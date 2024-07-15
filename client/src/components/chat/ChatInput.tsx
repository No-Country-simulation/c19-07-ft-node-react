import { type KeyboardEvent, useState } from "react";

import { Send } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [value, setValue] = useState("");

  const handleSendMessage = () => {
    if (value.trim().length > 0) {
      // ? Send message
      onSendMessage(value);

      // ? Clear input
      setValue("");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box right={0} bottom={0} left={0} px={2} pb={2}>
      <TextField
        onKeyDown={handleKeyDown}
        fullWidth
        multiline
        maxRows={3}
        placeholder="Message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleSendMessage}
                onMouseDown={(e) => e.preventDefault()}
                disabled={value.trim().length === 0}
                edge="end"
              >
                <Send />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
