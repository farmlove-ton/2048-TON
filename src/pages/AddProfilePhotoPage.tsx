import { useEffect } from "react";
import { showBackButton } from "../lib/telegram";
import { Link } from "react-router-dom";

const CreateProfilePage = () => {
  useEffect(() => {
    showBackButton();
  }, []);

  return <Link to="/suggestion">Suggestions</Link>;
};

export default CreateProfilePage;
