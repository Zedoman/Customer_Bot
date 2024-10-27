"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { sendMessage } from "../lib/sendMessage";
import "./Chat.module.css";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hello, how can I help you today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div id="supportChat">
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundImage: `url('https://images.pexels.com/photos/1486861/pexels-photo-1486861.jpeg')`, // Set the background image
          backgroundSize: "cover", // Cover the entire box
          backgroundPosition: "center", // Center the image
          backgroundRepeat: "no-repeat", // Prevent the image from repeating
          display: "flex",
          flexDirection: "column",
          padding: 2,
        }}
      >
        <Stack
          direction="column"
          width="600px"
          height="750px"
          border="1px solid #444"
          bgcolor="#E8BA40"
          p={2}
          spacing={3}
          borderRadius={4}
          className="custom-scrollbar"
          style={{ opacity: 0.95 }}
        >
          <Typography variant="h5" align="center" gutterBottom>
          SwiftSupport
          </Typography>
          <Stack
            direction="column"
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
            className="custom-scrollbar"
            style={{ opacity: 10 }}
          >
            {messages.map((message: Message, index: number) => {
              return (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={
                    message.role === "assistant" ? "flex-start" : "flex-end"
                  }
                >
                  <Box
                    bgcolor={
                      message.role === "assistant" ? "#7C8363" : "#31473A"
                    }
                    color="white"
                    borderRadius={16}
                    p={3}
                    maxWidth="73%"
                    fontSize="0.95rem"
                    lineHeight="1.4"
                  >
                    {message.content}
                  </Box>
                </Box>
              );
            })}
            <div ref={messagesEndRef} />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Type a message"
              fullWidth
              value={input}
              onChange={(event) => setInput(event.target.value)}
              variant="outlined"
              InputProps={{
                style: {
                  color: "white",
                  backgroundColor: "#E3856B",
                  borderRadius: 8,
                },
              }}
              InputLabelProps={{
                style: { color: "lightgray" },
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#3B5BA5",
                borderRadius: "50px", // Set a high value for a more oval shape
                padding: "10px 20px", // Optional: adjust padding for size
                "&:hover": {
                  bgcolor: "#0056b3",
                },
              }}
              onClick={() => {
                if (!isLoading) {
                  sendMessage(
                    messages,
                    input,
                    setInput,
                    setMessages,
                    isLoading,
                    setIsLoading
                  );
                }
              }}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default Chat;
