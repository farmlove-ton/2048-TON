import { useState } from "react";
import WebApp from "@twa-dev/sdk";
import { Link } from "react-router-dom";

import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

const HomaPage = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <Link to="/create-profile">Create profile page</Link>

      <div className="card">
        <button
          onClick={() => {
            WebApp.showAlert(`Hello World! Current count is ${count}`);
            console.log(WebApp.initDataUnsafe.user?.id);
          }}
        >
          Show Alert
        </button>
      </div>
    </>
  );
};

export default HomaPage;
