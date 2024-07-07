import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import Header from "../Polling/Header";
import { authActions } from "../Context/store";
import PollFeed from "../Polling/PollFeed";
import { Poll } from "../Context/poll";
import useSocket from "../Hooks/useSocket";


const ProfilePage = () => {
  const [userData, setUserData] = useState<any>({});
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { token , profilePhotoURL} = useSelector((state: any) => state.auth);
  const socket = useSocket();
  const url:string = process.env.REACT_APP_BACKEND_URL as string;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(url , {
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
      if (selectedFile) {
        formData.append("profilePhoto", selectedFile);
        const response = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "profilePhoto",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );
        dispatch(authActions.setProfilePhotoURL(response.data.profilePhotoURL));
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
      <div className="container-fluid">
        <h3 >Your Polls</h3>
       
        {
        userData?.polls?.map((element:Poll) =>{
          return <PollFeed
          hasVoted = {true}
          key={element._id} 
          pollId= {element._id}
          question={element.question}
          options={element.options}
          userName={userData.name}
          profilePhotoURL= {profilePhotoURL}
          comments={element.comments}
          showAllComments={true}
          socket={socket}
        />
        })}
      </div>
    </>
  );
};

export default ProfilePage;
