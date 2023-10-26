import styles from "./styles";

export default function WebGLError() {
  return (
    <div
      style={Object.assign({}, styles.popupContainer, {
        opacity: webGLErrorOpacity,
      })}
    >
      <div style={styles.startPopup}>
        <p>
          <b style={{ color: "red" }}>CRITICAL ERROR:</b> No WebGL Detected
        </p>
        <div style={styles.spacer} />
        <div style={styles.spacer} />

        <p>WebGL is required to run this site.</p>
        <p>Please enable it or switch to a browser which supports WebGL</p>
      </div>
    </div>
  );
}
