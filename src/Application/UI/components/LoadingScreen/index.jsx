import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles";

import getCurrentDate from "../../../../utils/getCurrentDate";
import isOnDebugMode from "../../../../utils/isOnDebugMode";
import detectWebGLContext from "../../../../utils/detectWebGLContext";
import getSpaceOnString from "../../../../utils/getSpaceOnString";

import eventBus from "../../EventBus";

import { UI_ID_NAME } from "../../../../config/consts";

import FirefoxError from "./FirefoxError";
import WebGLError from "./WebGLError";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [toLoad, setToLoad] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [overlayOpacity, setLoadingOverlayOpacity] = useState(1);
  const [loadingTextOpacity, setLoadingTextOpacity] = useState(1);
  const [startPopupOpacity, setStartPopupOpacity] = useState(0);
  const [firefoxPopupOpacity, setFirefoxPopupOpacity] = useState(0);
  const [webGLErrorOpacity, setWebGLErrorOpacity] = useState(0);

  const [showBiosInfo, setShowBiosInfo] = useState(false);
  const [showLoadingResources, setShowLoadingResources] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [firefoxError, setFirefoxError] = useState(false);
  const [webGLError, setWebGLError] = useState(false);
  const [counter, setCounter] = useState(0);
  const [resources] = useState([]);

  const [mobileWarning, setMobileWarning] = useState(window.innerWidth < 768);

  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      setMobileWarning(true);
    } else {
      setMobileWarning(false);
    }
  });

  useEffect(() => {
    if (isOnDebugMode()) {
      start();
    }
    if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
      setFirefoxError(true);
    } else if (!detectWebGLContext()) {
      setWebGLError(true);
    } else {
      setShowBiosInfo(true);
    }
  }, []);

  useEffect(() => {
    eventBus.on("loadedSource", (data) => {
      setProgress(data.progress);
      setToLoad(data.toLoad);
      setLoaded(data.loaded);
      resources.push(
        `Loaded ${data.sourceName}${getSpaceOnString(
          data.sourceName
        )} ... ${Math.round(data.progress * 100)}%`
      );

      if (resources.length > 8) {
        resources.shift();
      }
    });
  }, []);

  useEffect(() => {
    setShowLoadingResources(true);
    setCounter(counter + 1);
  }, [loaded]);

  useEffect(() => {
    if (progress >= 1 && !firefoxError && !webGLError) {
      setDoneLoading(true);

      setTimeout(() => {
        setLoadingTextOpacity(0);
        setTimeout(() => {
          setStartPopupOpacity(1);
        }, 500);
      }, 1000);
    }
  }, [progress]);

  useEffect(() => {
    if (firefoxError) {
      setTimeout(() => {
        setFirefoxPopupOpacity(1);
      }, 500);
    }
  }, [firefoxError]);

  useEffect(() => {
    if (webGLError) {
      setTimeout(() => {
        setWebGLErrorOpacity(1);
      }, 500);
    }
  }, [webGLError]);

  const start = useCallback(() => {
    setLoadingOverlayOpacity(0);
    eventBus.dispatch("loadingScreenDone", {});
    const ui = document.getElementById(UI_ID_NAME);
    if (ui) {
      ui.style.pointerEvents = "none";
    }
  }, []);

  return (
    <div
      style={Object.assign({}, styles.overlay, {
        opacity: overlayOpacity,
        transform: `scale(${overlayOpacity === 0 ? 1.1 : 1})`,
      })}
    >
     {doneLoading ? <div>ready</div> :  <div>Loading..</div> }
      {firefoxError && <FirefoxError />}
      {webGLError && <WebGLError />}
    </div>
  );
};

export default LoadingScreen;
