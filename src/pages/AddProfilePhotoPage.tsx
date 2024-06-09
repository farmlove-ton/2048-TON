import { useContext, useEffect } from "react";
import { showBackButton } from "../lib/telegram";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../context/UserProfileContext";

const CreateProfilePage = () => {
  const { userProfile, setUserProfile } = useContext(UserProfileContext);

  console.log(userProfile, setUserProfile);

  useEffect(() => {
    showBackButton();
  }, []);

  return <Link to="/suggestion">Suggestions</Link>;
};

export default CreateProfilePage;
