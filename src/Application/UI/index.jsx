import React, { useEffect, useState } from "react";

import ReactDOM from "react-dom";

import LoadingScreen from "./components/LoadingScreen";
// import HelpPrompt from './components/HelpPrompt';
// import InterfaceUI from './components/InterfaceUI';
import eventBus from "./EventBus";
import { UI_ID_NAME } from "../../config/consts";

// import './style.css';

const UI = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventBus.on("loadingScreenDone", () => {
      alert("loadingScreenDone")
      setLoading(false);
    });
  }, []);

  return loading ? (
    <div id={`${UI_ID_NAME}-content`}>
      <LoadingScreen />
    </div>
  ) : (
    <div>test</div>
  );

  
};

const createUI = () => {
  ReactDOM.render(<UI />, document.getElementById(UI_ID_NAME));
};

export default class {
  constructor() {
    createUI();
  }
}
