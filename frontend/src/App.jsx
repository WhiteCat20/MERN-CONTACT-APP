import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Body } from "./components/Body";
import { Navbar } from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App min-h-screen bg-gray-300">
      <Navbar />
      <Body />
    </div>
  );
}

export default App;
