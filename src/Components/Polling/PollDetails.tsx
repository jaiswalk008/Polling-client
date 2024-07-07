import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import PollFeed from "./PollFeed";
import useSocket from "../Hooks/useSocket";

const PollDetails = () => {
    const { pollId } = useParams();
    const [poll, setPoll] = useState<any>({});
    
    const socket = useSocket();
    useEffect(() => {
        const fetchPollDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}poll/${pollId}`); 
                console.log(response.data);
                setPoll(response.data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchPollDetails();
    }, [pollId]);

  
    return (
        <>  
            <Header />
            {Object.keys(poll).length>0 && <PollFeed
            hasVoted = {true}
            key={poll?.poll?._id} 
            pollId= {poll?.poll?._id}
            question={poll?.poll?.question}
            options={poll?.poll?.options}
            userName={poll?.poll?.userId?.name}
            profilePhotoURL= {poll?.poll?.userId?.profilePhotoURL}
            comments={poll?.comments}
            showAllComments={true}
            socket={socket}
            />}
        </>
    );
};

export default PollDetails;
