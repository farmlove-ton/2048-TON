import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { hideBackButton } from "../lib/telegram";
import { Button } from "../components";

const HomaPage = () => {
  useEffect(() => {
    hideBackButton();
  }, []);

  return (
    <>
      <Link to="/create-profile">Create profile page</Link>

      <Button
        onClick={() => {
          WebApp.showAlert(`Hello World! Current count is 123`);
        }}
      >
        Show Alert
      </Button>
    </>
  );
};

export default HomaPage;
