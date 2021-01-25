import React, { createContext, useState, useEffect } from "react";

export const AlertsContext = createContext({
  latestFollower: null,
  latestSubscriber: null,
  latestTipper: null,
  latestCheers: null,
});

const AlertsProvider = ({ children }) => {
  const [latestFollower, setLatestFollower] = useState();
  const [latestSubscriber, setLatestSubscriber] = useState();
  const [latestTipper, setLatestTipper] = useState();
  const [latestCheers, setLatestCheers] = useState();

  const checkLatestFollower = (data) => {
    const followerName = data.event.name;
    if (data.listener !== "follower-latest" || latestFollower === followerName)
      return;
    setLatestFollower(data.event.name);
  };

  const checkLatestSubscriber = (data) => {
    const subscriberName = data.event.name;
    if (
      data.listener !== "subscriber-latest" ||
      latestSubscriber?.name === subscriberName
    )
      return;
    setLatestSubscriber({
      name: data.event.name,
      tier: data.event.tier,
      message: data.event.message,
      amount: data.event.amount,
    });
  };

  const checkLatestTipper = (data) => {
    const tipperName = data.event.name;
    if (data.listener !== "tip-latest" || latestTipper?.name === tipperName)
      return;
    setLatestTipper({
      name: data.event.name,
      tier: data.event.tier,
      message: data.event.message,
      amount: data.event.amount,
    });
  };

  const checkLatestCheers = (data) => {
    const latestCheersName = data.event.name;
    if (
      data.listener !== "cheer-latest" ||
      latestCheers?.name === latestCheersName
    )
      return;
    setLatestCheers({
      name: data.event.name,
      tier: data.event.tier,
      message: data.event.message,
      amount: data.event.amount,
    });
  };

  // Connnect to socket and link sockets events to functions --^
  useEffect(() => {
    // eslint-disable-next-line no-undef
    const socket = io("https://realtime.streamelements.com", {
      transports: ["websocket"],
    });

    const onEventUpdate = (data) => {
      checkLatestSubscriber(data);
      checkLatestFollower(data);
      checkLatestTipper(data);
      checkLatestCheers(data);
    };

    // Socket connected
    socket.on("connect", () => {
      socket.emit("authenticate", {
        method: "jwt",
        token: process.env.REACT_APP_STREAMELEMENTS_TOKEN,
      });
    });

    socket.on("event:test", onEventUpdate);
    socket.on("event", onEventUpdate);
  }, []);

  return (
    <AlertsContext.Provider
      value={{ latestFollower, latestSubscriber, latestTipper, latestCheers }}
    >
      {children}
    </AlertsContext.Provider>
  );
};

export default AlertsProvider;
