import "./App.css";
import { Suspense } from "react";

import Globe from "./components/Globe";

function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Globe />
      </Suspense>
    </>
  );
}

export default App;
