import WebApp from "@twa-dev/sdk";
import { Link } from "react-router-dom";

const HomaPage = () => {
  return (
    <>
      <Link to="/create-profile">Create profile page</Link>
      <Link to="/add-photo">Add Profile Photo Page</Link>

      <button
        onClick={() => {
          WebApp.showAlert(`Hello World! Current count is 123`);
          console.log(WebApp.initDataUnsafe.user?.id);
        }}
      >
        Show Alert
      </button>
    </>
  );
};

export default HomaPage;
