import { ChangeEvent, useState } from "react";
import "./AddProfilePhotoPage.css";

const CreateProfilePage = () => {
  const [photo, setPhoto] = useState<File>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setPhoto(file);
    }
  };

  const renderPhoto = (photo: File) => {
    return <img src={URL.createObjectURL(photo)} alt="photo" />;
  };

  return (
    <form className="profilePage__form">
      <h1 className="profilePage__form-title">Add profile photos</h1>
      {!!photo && renderPhoto(photo)}
      <input
        type="file"
        name="photo"
        className="profilePage__form-inputPhoto"
        onChange={handleFileChange}
        multiple
      />

      <p>You must add 3 photos to continue</p>
      <button type="submit">Continue</button>
    </form>
  );
};

export default CreateProfilePage;
