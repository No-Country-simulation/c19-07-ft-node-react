import { useEffect, useRef, useState } from "react";

import { Box } from "@mui/material";

import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { ChatParticipants } from "./ChatParticipants";
import { socket } from "../../socket/socket";
import { useAuthStore } from "../../hooks";

// const authenticatedUser = {
//   id: 1,
//   name: "Juan",
//   role: "teacher",
// };

// const initMessages = [
//   {
//     userId: 1,
//     message:
//       "Good afternoon, Mrs. Johnson. I wanted to discuss Emma's recent science project. She showed great creativity, but there are some areas where she needs to focus more.",
//   },
//   {
//     userId: 2,
//     message:
//       "Good afternoon, Prof. Smith. Thank you for reaching out. I'm happy to hear Emma was creative. Could you please elaborate on the areas that need improvement?",
//   },
//   {
//     userId: 1,
//     message:
//       "Of course. While Emma's project idea was innovative, her research lacked depth in certain scientific principles. I've left some comments on her project file and recommended some resources she can use to enhance her understanding.",
//   },
//   {
//     userId: 2,
//     message:
//       "Thank you for the detailed feedback, Prof. Smith. I will go through the comments with Emma this evening. Are there any specific topics we should focus on first?",
//   },
//   {
//     userId: 1,
//     message:
//       "Focusing on the scientific method and ensuring she backs her hypotheses with thorough research would be beneficial. Please let me know if you need any additional resources or have any questions as you go through the material.",
//   },
// ];

// const participants = [];

type Message = {
  userId: string;
  message: string;
};

interface ChatProps {
  receiverId: string;
}

export const Chat = ({ receiverId }: ChatProps) => {
  const { user } = useAuthStore();
  console.log('user--->',user)

  const msgsContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const scrollToBottom = () => {
    if (!msgsContainerRef.current) return;

    msgsContainerRef.current.scrollTop = msgsContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("receiveMessage", (msg: string) => {
      console.log("receiveMessage", msg);
      setMessages((prevMessages) => [
        ...prevMessages,
        { userId: "", message: msg },
      ]);
      scrollToBottom();
    });

    // socket.emit("receiveMessage", );

    return () => {
      socket.off("connect");
      socket.off("chat message");
    };
  }, []);

  // const handleSendMessage = (message: string) => {
  //   socket.emit("chat message", message);
  //   setMessages([...messages, { userId: 1, message }]);
  //   scrollToBottom();
  // };

  const handleSendMessage = (message: string) => {
    const messageData = {
      userSendID: user?.user_id,
      userReceiveId: receiverId,
      message,
    };

    socket.emit("sendMessage", messageData);
    setMessages((prevMessages) => [
      ...prevMessages,
      { userId: user!.user_id, message },
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
          {/* {messages.map(({ userId, message }, index) => (
            <ChatMessage
              key={index}
              message={message}
              isSender={userId === authenticatedUser.id}
                

          />
          ))} */}

          {messages.map(({ userId, message }, index) => (
            <ChatMessage
              key={index}
              message={message}
              isSender={userId === user!.user_id}
            />
          ))}
        </Box>
      </Box>

      {/* <ChatInput
        onSendMessage={(message) => {
          setMessages([...messages, { userId: 1, message }]);
          scrollToBottom();
        }}
      /> */}

      <ChatInput onSendMessage={handleSendMessage} />
    </Box>
  );
};
