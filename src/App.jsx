import React, { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { Button, Card, CardBody, Input } from "reactstrap";

export default function ChatAssistant() {
  const [messages, setMessages] = useState([
    { sender: "AI", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "User", text: input }];
    setMessages(newMessages);
    setInput("");
    
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "AI", text: mockAIResponse(input) }]);
    }, 1000);
  };

  const mockAIResponse = (query) => {
    if (query.toLowerCase().includes("schedule")) {
      return "Sure! What time should I schedule it for?";
    } else if (query.toLowerCase().includes("task")) {
      return "I have added this to your task list.";
    } else {
      return "I'm still learning! Could you rephrase that?";
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <Card className="flex-grow overflow-hidden">
        <CardBody className="h-full p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-2 p-2 rounded-xl w-fit max-w-xs ${
                msg.sender === "AI" ? "bg-blue-200" : "bg-green-200 ml-auto"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
        </CardBody>
      </Card>
      <div className="flex p-2 border-t bg-white">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow mr-2"
        />
        <Button onClick={handleSend}>
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
}
