import { useState } from "react";
import PollForm from "./PollForm";
import { useSelector } from "react-redux";

const CreatePoll = ()=>{
    const [showPollForm , setShowPollForm] = useState<boolean> (false);
    const showPollFormHandler = ()=>{
        setShowPollForm(prev => !prev);
    }
    const {profilePhotoURL} = useSelector((state:any) => state.auth);
    return (
        <div className="container mt-5">
            {!showPollForm && <div onClick={showPollFormHandler} className="d-flex mb-2">
                <img className="profile-photo" src={profilePhotoURL} alt="profile-photo"/>
                <div className=" create-poll">Create a poll</div>
            </div>}
            {showPollForm && <PollForm onCancel={showPollFormHandler}/>}
        </div>
    )
}
export default CreatePoll;