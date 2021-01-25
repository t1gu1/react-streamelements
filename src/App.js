import { useState, useEffect } from "react";
import { Animated } from "react-animated-css";
import "./App.css";

import logo from "./logo.svg";
// import io from "socket.io-client";
import tmi from "tmi.js";

function App() {
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [latestFollower, setLatestFollower] = useState();

  const client = new tmi.Client({
    connection: { reconnect: true },
    channels: [process.env.REACT_APP_CHANNEL_NAME],
  });

  client.connect();

  client.on("message", (channel, tags, message, self) => {
    // "Alca: Hello, World!"
    console.log("channel", channel);
    console.log("tags", tags);
    console.log(`${tags["display-name"]}: ${message}`);
  });

  const JWT = process.env.REACT_APP_STREAMELEMENTS_TOKEN;

  // eslint-disable-next-line no-undef
  const socket = io("https://realtime.streamelements.com", {
    transports: ["websocket"],
  });

  const onConnect = () => {
    console.log("Successfully connected to the websocket");
    socket.emit("authenticate", {
      method: "jwt",
      token: JWT,
    });
  };

  const onDisconnect = () => {
    console.log("Disconnected from websocket");
    // Reconnect
  };

  const onAuthenticated = (data) => {
    const { channelId } = data;

    console.log(`Successfully connected to channel ${channelId}`);
  };

  const onEventUpdateTest = (data) => {
    // console.log("onEventUpdateTest:", data); // uncomment to see all info
    const followerName = data.event.name;
    if (data.listener !== "follower-latest" || latestFollower === followerName)
      return;
    setLatestFollower(data.event.name);
    console.log("A new FOLLOWER!!!", followerName);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLogoVisible(false);
    }, 5000);
  }, []);

  useEffect(() => {
    // Socket connected
    socket.on("connect", onConnect);

    // Socket got disconnected
    socket.on("disconnect", onDisconnect);

    // Socket is authenticated
    socket.on("authenticated", onAuthenticated);

    socket.on("event:test", onEventUpdateTest);

    socket.on("event", (data) => {
      console.log(data);
      // Structure as on JSON Schema
    });

    socket.on("event:update", (data) => {
      console.log("event:update", data);
      // Structure as on https://github.com/StreamElements/widgets/blob/master/CustomCode.md#on-session-update
    });

    socket.on("event:reset", (data) => {
      console.log("event:reset", data);
      // Structure as on https://github.com/StreamElements/widgets/blob/master/CustomCode.md#on-session-update
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Animated
          animationIn="bounceInDown"
          animationOut="bounceOutUp"
          isVisible={isLogoVisible}
        >
          <div className="">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </Animated>

        <p className="">
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
