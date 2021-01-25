import { useState, useEffect, useContext } from "react";
import { Animated } from "react-animated-css";
import "./App.css";
import { ChatContext } from "./providers/ChatProvider";
import { AlertsContext } from "./providers/AlertsProvider";

import logo from "./logo.svg";
// import io from "socket.io-client";

function App() {
  const { chat } = useContext(ChatContext);
  const {
    latestFollower,
    latestSubscriber,
    latestTipper,
    latestCheers,
  } = useContext(AlertsContext);
  const [isLogoVisible, setIsLogoVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLogoVisible(false);
    }, 5000);
  }, []);

  // This is how to watch chat messages
  useEffect(() => {
    console.log(chat);
  }, [chat]);

  // This is how to watch an alert
  useEffect(() => {
    console.log("latestFollower", latestFollower);
  }, [latestFollower]);

  // This is how to watch an alert
  useEffect(() => {
    console.log("latestSubscriber", latestSubscriber);
  }, [latestSubscriber]);

  // This is how to watch an alert
  useEffect(() => {
    console.log("latestTipper", latestTipper);
  }, [latestTipper]);

  // This is how to watch an alert
  useEffect(() => {
    console.log("latestCheers", latestCheers);
  }, [latestCheers]);

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
