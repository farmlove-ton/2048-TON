import { useEffect } from "react";
import { showBackButton } from "../lib/telegram";

const CreateProfilePage = () => {
  useEffect(() => {
    showBackButton();
  }, []);

  return "Hello";
};

export default CreateProfilePage;
