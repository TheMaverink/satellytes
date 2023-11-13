import React from "react";
import ReactDOM from "react-dom/client";
import { UI_ID_NAME, WEBGL_WRAPPER_ID_NAME } from "./config/consts";
import "./index.css";

import Application from "./Application/Application";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Root = () => {
  const applicationRef = React.useRef(null);

  React.useEffect(() => {
    if (!applicationRef.current) {
      // applicationRef.current = new Application(
      //   document.getElementById(WEBGL_ID_NAME)
      // );

      applicationRef.current = new Application();
    }
  }, []);

  return (
    <>
      <div id="css"></div>
      <div id={UI_ID_NAME}></div>
      <div id={WEBGL_WRAPPER_ID_NAME}></div>
    </>
  );
};

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
