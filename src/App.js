import { useState, useEffect } from "react";
import { Animated } from "react-animated-css";
import "./App.css";

import logo from "./logo.svg";

function App() {
  const [isLogoVisible, setIsLogoVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLogoVisible(false);
    }, 5000);
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
