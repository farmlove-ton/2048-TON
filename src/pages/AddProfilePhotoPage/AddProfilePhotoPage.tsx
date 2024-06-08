import { useState } from "react";
import './AddProfilePhotoPage.css'

const CreateProfilePage = () => {
  const [photo, setPhoto] = useState()

  const renderPhoto = (photo:string | undefined) => {
    {if (photo !== undefined) {
      return <img src={photo} alt="photo" />  
    } else {
      return
    }
  }
  }

  return (
        <form className="profilePage__form">
          <h1 className="profilePage__form-title">Add profile photos</h1>
          {renderPhoto(photo)}
          <input type="file" name="photo" className="profilePage__form-inputPhoto" onChange={(e:string)=>setPhoto(e.target.value)} multiple/>

          <p>You must add 3 photos to continue</p>
          <button type="submit">Continue</button>
        </form>
  )
};

export default CreateProfilePage;