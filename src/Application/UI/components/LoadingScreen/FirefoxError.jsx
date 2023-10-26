import styles from "./styles";

const FireFoxError = () => {
  return (
    <div
      style={Object.assign({}, styles.popupContainer, {
        opacity: firefoxPopupOpacity,
      })}
    >
      <div style={styles.startPopup}>
        <p>
          <b style={{ color: "red" }}>FATAL ERROR:</b> Firefox Detected
        </p>
        <div style={styles.spacer} />
        <div style={styles.spacer} />
        <p>
          Due to a{" "}
          <a
            style={styles.link}
            href={"https://github.com/henryjeff/portfolio-website/issues/6"}
          >
            bug in firefox
          </a>
          , this website is temporarily inaccessible for anyone using the
          browser.
        </p>
        <div style={styles.spacer} />

        <p>
          In the mean time if you want to access this site you will need to use
          a different browser.
        </p>
      </div>
    </div>
  );
};

export default FireFoxError;
