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
  const {polls} = useSelector((state:any) => state.polls) ;
  const {token} = useSelector((state:any) => state.auth) ;
  const fetchPollData = useCallback(async () =>{
    const res = await axios.get(import.meta.env.VITE_BACKEND_URL+'poll',
      {headers:{Authorization:token}}
    );
    console.log(res.data)
    dispatch(pollActions.setPolls(res.data));
  },[])

  useEffect(() =>{
    fetchPollData();
  },[])

  return (
    <div>
      <Header/>
      <CreatePoll/>
      {polls.map((element: Poll, index: number) => (
        <PollFeed
          hasVoted = {element.hasVoted}
          key={index} // Ensure each component has a unique key prop
          question={element.question}
          options={element.options}
          userName={element.userId.name}
          profilePhotoURL= {element.userId.profilePhotoURL}

        />
      ))}
    </div>
  );
};


export default Home;
