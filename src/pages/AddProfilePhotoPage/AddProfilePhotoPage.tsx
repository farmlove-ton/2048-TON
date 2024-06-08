import { ChangeEvent, useState } from "react";
import "./AddProfilePhotoPage.css";

const CreateProfilePage = () => {
  const [photo, setPhoto] = useState<File>();

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
    <form className="profilePage__form">
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
      <button className="btn" type="submit"><span>Continue</span></button>
    </form>
  );
};

export default CreateProfilePage;
