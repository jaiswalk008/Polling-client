import { useCallback, useEffect } from 'react';
import PollFeed from './PollFeed';
import Header from './Header';
import CreatePoll from './CreatePoll';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { pollActions } from '../Context/store';
import { Poll } from '../Context/poll';


const Home= () => {
  const dispatch = useDispatch();
  const {poll} = useSelector((state:any) => state.polls) ;
  const {token} = useSelector((state:any) => state.auth) ;
  const fetchPollData = useCallback(async () =>{
    const res = await axios.get(import.meta.env.VITE_BACKEND_URL+'poll',
      {headers:{Authorization:token}}
    );
    console.log(res.data)
    dispatch(pollActions.setPoll(res.data));
  },[])

  useEffect(() =>{
    fetchPollData();
  },[])

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
        />
      ))}
    </div>
  );
};


export default Home;
