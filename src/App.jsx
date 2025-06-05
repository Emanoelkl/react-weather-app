import { useState } from "react";
import "./App.css";

function App() {
  const [x, setX] = useState("World");

  return (
    <>
      <h1>Hello {x}</h1>
    </>
  );
}

export default App;
