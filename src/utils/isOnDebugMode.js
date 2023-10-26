const isOnDebugMode = () => {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.has("debug");
};

export default isOnDebugMode;
