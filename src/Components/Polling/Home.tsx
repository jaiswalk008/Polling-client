import { useCallback, useEffect } from 'react';
import PollFeed from './PollFeed';
import Header from './Header';
import CreatePoll from './CreatePoll';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { pollActions } from '../Context/store';
import { Poll } from '../Context/poll';
import useSocket from '../Hooks/useSocket';


const Home= () => {
  const dispatch = useDispatch();
  const {poll} = useSelector((state:any) => state.polls) ;
  const {token} = useSelector((state:any) => state.auth) ;
  
  const fetchPollData = useCallback(async () =>{
    const res = await axios.get(import.meta.env.VITE_BACKEND_URL+'poll',
      {headers:{Authorization:token}}
    );
    dispatch(pollActions.setPoll(res.data));
  },[])
  const socket = useSocket();
  useEffect(() =>{
    fetchPollData();
  },[])
  
  useEffect(() =>{
  
    socket.on('connect' , () =>{
      console.log(socket.id);
    })
    

    return () =>{
      socket.off('connet',() =>{
        console.log(socket.id);
      })      
    }
  },[socket])
  return (
    <div>
      <Header/>
      <CreatePoll/>
      {poll.map((element: Poll) => (
        <PollFeed
          hasVoted = {element.hasVoted}
          key={element._id} 
          pollId= {element._id}
          question={element.question}
          options={element.options}
          userName={element.userId.name}
          profilePhotoURL= {element.userId.profilePhotoURL}
          comments={element.comments}
          showAllComments={false}
          socket={socket}
        />
      ))}
    </div>
  );
};


export default Home;
