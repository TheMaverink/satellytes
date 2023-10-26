
const detectWebGLContext = () => {
    var canvas = document.createElement("canvas");

    // Get WebGLRenderingContext from canvas element.
    var gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    // Report the result.
    if (gl && gl instanceof WebGLRenderingContext) {
      return true;
    }
    return false;
  };

  export default detectWebGLContext