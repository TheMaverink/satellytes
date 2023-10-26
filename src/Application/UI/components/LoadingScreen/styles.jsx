const styles = {
  overlay: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    display: "flex",
    transition: "opacity 0.2s, transform 0.2s",
    MozTransition: "opacity 0.2s, transform 0.2s",
    WebkitTransition: "opacity 0.2s, transform 0.2s",
    OTransition: "opacity 0.2s, transform 0.2s",
    msTransition: "opacity 0.2s, transform 0.2s",

    transitionTimingFunction: "ease-in-out",
    MozTransitionTimingFunction: "ease-in-out",
    WebkitTransitionTimingFunction: "ease-in-out",
    OTransitionTimingFunction: "ease-in-out",
    msTransitionTimingFunction: "ease-in-out",

    boxSizing: "border-box",
    fontSize: 16,
    letterSpacing: 0.8,
  },

  spacer: {
    height: 16,
  },
  header: {
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
  },
  popupContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  warning: {
    color: "yellow",
  },
  blinkingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    boxSizing: "border-box",
    padding: 48,
  },
  startPopup: {
    backgroundColor: "#000",
    padding: 24,
    border: "7px solid #fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: 500,
    // alignItems: 'center',
  },
  headerInfo: {
    marginLeft: 64,
  },
  red: {
    color: "#00ff00",
  },
  link: {
    // textDecoration: 'none',
    color: "#4598ff",
    cursor: "pointer",
  },
  overlayText: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  body: {
    flex: 1,
    display: "flex",
    width: "100%",
    boxSizing: "border-box",
    flexDirection: "column",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
  },
  resourcesLoadingList: {
    display: "flex",
    paddingLeft: 32,
    paddingBottom: 32,
    flexDirection: "column",
  },
  logoImage: {
    width: 64,
    height: 42,
    imageRendering: "pixelated",
    marginRight: 16,
  },
  footer: {
    boxSizing: "border-box",
    width: "100%",
  },
};

export default styles;
