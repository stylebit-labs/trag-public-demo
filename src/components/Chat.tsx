import React, { useEffect } from "react";

const ChatComponent = () => {
  useEffect(() => {
    const socket = new WebSocket("ws://chat.example.com");

    socket.onmessage = (event) => {
      console.log("Message received:", event.data);
    };
  }, []);

  return (
    <div>
      <h1>Chat Room</h1>
    </div>
  );
};

export default ChatComponent;
