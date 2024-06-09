import { ChangeEvent, useContext, useEffect, useState } from "react";
import "./AddProfilePhotoPage.css";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import { showBackButton } from "../../lib/telegram";
import { useForm } from "react-hook-form";
import { UserProfileContext } from "../../context/UserProfileContext";

const CreateProfilePage = () => {
  const [photo, setPhoto] = useState<File>();
  const { userProfile, setUserProfile } = useContext(UserProfileContext);

  const { register, handleSubmit } = useForm<IFormInput>({});
  const navigate = useNavigate();

  useEffect(() => {
    showBackButton();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setUserProfile({ ...userProfile, ...data });

    navigate("/suggestion");
  };


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files?.[0])
    const file = event.target.files?.[0];

    if (file) {
      setPhoto(file);
    }
  };

  const renderPhoto = (photo: File) => {
    return <img src={URL.createObjectURL(photo)} alt="photo" />;
  };


  return (
    <form 
      className="profilePage__form"
      onSubmit={handleSubmit(onSubmit)}>
      <h1 className="profilePage__form-title">Add profile photos</h1>
      <div className="profilePage__form-photo">
        {!!photo && renderPhoto(photo)}
        <input
          type="file"
          name="photo"
          className="profilePage__form-inputPhoto"
          onChange={handleFileChange}
          multiple
        />
      </div>

      <p className="profilePage__form-text">You must add 3 photos to continue</p>
      <Button type="submit">Continue</Button>
    </form>
  );
};

export default CreateProfilePage;
