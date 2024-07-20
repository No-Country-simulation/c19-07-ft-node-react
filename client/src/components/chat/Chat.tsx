import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { ChatParticipants } from "./ChatParticipants";
import { socket } from "../../socket/socket";
import { useAuthStore } from "../../hooks";

type Message = {
  message_id: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  userSendID: string;
  userReceiveId: string;
};

interface ChatProps {
  receiverId: string;
}

export const Chat = ({ receiverId }: ChatProps) => {
  const { user } = useAuthStore();
  console.log('user--->', user)

  const msgsContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const scrollToBottom = () => {
    if (!msgsContainerRef.current) return;
    msgsContainerRef.current.scrollTop = msgsContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    if (user?.user_id) {
      console.log('Registering socket with user ID:', user.user_id);
      socket.emit('register', user.user_id);
    }
  
    const handleMessage = (msg) => {
      console.log('Message received:', msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    };
  
    socket.on('receiveMessage', handleMessage);
  
    return () => {
      socket.off('receiveMessage', handleMessage);
    };
  }, [user?.user_id]);
  

  const handleSendMessage = (message: string) => {
    const messageData = {
      userSendID: user?.user_id,
      userReceiveId: receiverId,
      message,
    };

    socket.emit("sendMessage", messageData);
    setMessages((prevMessages) => [
      ...prevMessages,
      { ...messageData, message_id: '', createdAt: new Date(), updatedAt: new Date() },
    ]);
    scrollToBottom();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      bgcolor="white"
      height="100%"
      borderRadius={1}
    >
      <ChatParticipants onClearChat={() => setMessages([])} />

      <Box
        px={2}
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="end"
        overflow="auto"
      >
        <Box
          ref={msgsContainerRef}
          display="flex"
          flexDirection="column"
          gap={2}
          px={2}
          mb={2}
          pt={2}
          overflow="auto"
        >
          {messages.map(({ userSendID, message }, index) => (
            <ChatMessage
              key={index}
              message={message}
              isSender={userSendID === user!.user_id}
            />
          ))}
        </Box>
      </Box>

      <ChatInput onSendMessage={handleSendMessage} />
    </Box>
  );
};
