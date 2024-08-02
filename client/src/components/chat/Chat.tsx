import { useEffect, useRef, useState } from "react";

import { Box } from "@mui/material";

import { useAuthStore } from "../../hooks";
import { socket } from "../../socket/socket";

import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { ChatParticipants } from "./ChatParticipants";

type Message = {
  message_id?: string;
  message: string;
  roomId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userSendID: string;
  userReceiveId: string;
};

type Receiver = {
  id: string;
  name: string;
  email: string;
};

interface ChatProps {
  receiver: Receiver;
}

export const Chat = ({ receiver }: ChatProps) => {
  const { user } = useAuthStore();

  const msgsContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const scrollToBottom = () => {
    if (!msgsContainerRef.current) return;
    msgsContainerRef.current.scrollTop = msgsContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    if (user?.user_id && receiver.id) {
      socket.emit("register", {
        userId: user.user_id,
        userReceiveId: receiver.id,
      });

      const handleMessageHistory = (messages: Message[]) => {
        if (Array.isArray(messages)) {
          setMessages(messages);
          scrollToBottom();
        } else {
          console.error("Message history is not an array:", messages);
        }
      };

      const handleMessage = (msg: Message) => {
        setMessages((prevMessages) => {
          if (prevMessages.some((m) => m.message_id === msg.message_id)) {
            return prevMessages;
          }
          return [...prevMessages, msg];
        });
        scrollToBottom();
      };

      socket.on("messageHistory", handleMessageHistory);
      socket.on("receiveMessage", handleMessage);

      return () => {
        socket.off("receiveMessage", handleMessage);
        socket.off("messageHistory", handleMessageHistory);
      };
    }
  }, [user?.user_id, receiver.id]);

  const handleSendMessage = (message: string) => {
    if (user?.user_id && receiver.id) {
      const messageData = {
        message,
        userSendID: user.user_id,
        userReceiveId: receiver.id,
      };

      socket.emit("sendMessage", messageData);

      setMessages((prevMessages) => [
        ...prevMessages,
        { ...messageData, message_id: "" },
      ]);
      scrollToBottom();
    } else {
      console.error("User ID or Receiver ID is missing.");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      bgcolor="white"
      height="100%"
      borderRadius={1}
    >
      <ChatParticipants
        receiverName={receiver.name}
        receiverEmail={receiver.email}
        onClearChat={() => setMessages([])}
      />

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
          {messages &&
            messages.map(({ userSendID, message }, index) => (
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
