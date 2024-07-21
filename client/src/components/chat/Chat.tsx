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

interface ChatProps {
  receiverId: string;
}

export const Chat = ({ receiverId }: ChatProps) => {
  const { user } = useAuthStore();

  const msgsContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomId, setRoomId] = useState<string | undefined>(undefined);

  const scrollToBottom = () => {
    if (!msgsContainerRef.current) return;
    msgsContainerRef.current.scrollTop = msgsContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    if (user?.user_id) {
      // console.log("Registering socket with user ID:", user.user_id);
      socket.emit("register", user.user_id);
    }

    // const handleMessage = (msg: Message) => {
    //   console.log("Message received:", msg);
    //   setMessages((prevMessages) => [...prevMessages, msg]);
    // };

    socket.on("receiveMessage", (message: Message) => {
      // console.log({ message });
      setRoomId(message.roomId);
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [user?.user_id, messages]);

  useEffect(() => {
    console.log(roomId);
  }, [roomId])

  useEffect(() => {
    console.log(messages);
  }, [messages])
  

  const handleSendMessage = (message: string) => {
    // if (!roomId) return;

    const newMessage: Message = {
      message,
      roomId,
      userSendID: user!.user_id,
      userReceiveId: receiverId,
    };

    socket.emit("sendMessage", newMessage);

    // setMessages((prevMessages) => [...prevMessages, newMessage]);

    // scrollToBottom();
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
