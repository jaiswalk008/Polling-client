import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import Header from "../Polling/Header";
import { authActions } from "../Context/store";
const ProfilePage = () => {
  const [userData, setUserData] = useState<any>({});
  const { profilePhotoURL } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { token } = useSelector((state: any) => state.auth);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL, {
          headers: {
            Authorization: token,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadPhoto = async () => {
    try {
      const formData = new FormData();
      console.log(selectedFile);
      if (selectedFile) {
        formData.append("profilePhoto", selectedFile);
        const response = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "profilePhoto",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );
        dispatch(authActions.setProfilePhotoURL(response.data.profilePhotoURL));
        // console.log('Photo uploaded:', response.data);
        // Optionally, update user data or display a success message
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="profile-info">
          <img className="profile-photo" src={profilePhotoURL} alt="Profile" />

          <div className="profile-details">
            <h2>{userData.name}</h2>
            <p>{userData.email}</p>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <button className="btn btn-dark" onClick={handleUploadPhoto}>
              Upload Photo
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <h3 >Your Polls</h3>
        
      </div>
    </>
  );
};

export default ProfilePage;
