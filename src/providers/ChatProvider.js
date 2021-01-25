import React, { createContext, useState } from "react";
// import merge from "deepmerge";
import tmi from "tmi.js";

export const ChatContext = createContext({
  chat: null,
});

const ChatProvider = ({ children }) => {
  const [chat, setChat] = useState();

  const client = new tmi.Client({
    connection: { reconnect: true },
    channels: [process.env.REACT_APP_CHANNEL_NAME],
  });

  client.connect();

  client.on("message", (channel, tags, message, self) => {
    setChat({ channel, tags, message, self });
  });

  return (
    <ChatContext.Provider value={{ chat }}>{children}</ChatContext.Provider>
  );
};

export default ChatProvider;
