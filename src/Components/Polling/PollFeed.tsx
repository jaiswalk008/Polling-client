import React, { useMemo, useState } from 'react';
import './Polling.css'; // Import your CSS file for styling
import { useDispatch, useSelector } from 'react-redux';
import { pollActions } from '../Context/store';
import axios from 'axios';
import { Option } from '../Context/poll';
import CommentSection, { Comment } from '../Comment/CommentSection';

interface PollFeedProps {
  pollId:string;
  hasVoted: boolean;
  question: string;
  options: Option[];
  userName: string;
  profilePhotoURL: string;
  comments:Comment[],
  showAllComments:boolean
}

const PollFeed: React.FC<PollFeedProps> = ({pollId, question, options, hasVoted, userName, profilePhotoURL, comments,showAllComments }) => {
  const dispatch = useDispatch();
  const [canVote, setCanVote] = useState(hasVoted);
  const { token } = useSelector((state: any) => state.auth);
  const handleVote = async (optionId: string, pollId: string) => {
    if (!hasVoted) {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}poll`, { optionId, pollId }, { headers: { Authorization: token } });
      dispatch(pollActions.addVote({ pollId, optionId }));
      setCanVote(true);
    }
  };

  const totalVotes = useMemo(() => options.reduce((acc, curr) => acc + curr.count, 0), [options]);

  return (
    <div className="container mt-3 poll-feed">
      <div className="d-flex">
        <img className="profile-photo" src={profilePhotoURL} alt="Profile" />
        <strong className="mt-2">{userName}</strong>
      </div>
      <div className="question">
        <p>Q. {question}</p>
        {options.map((option) => (
          <div key={option._id} onClick={() => handleVote(option._id, option.pollId)} className="option">
            {option.text}
            {canVote && (
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${totalVotes === 0 ? 0 : (option.count / totalVotes) * 100}%` }}
                  aria-valuenow={(option.count / totalVotes) * 100}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  ({option.count} votes)
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='d-flex'>
        <div className="votes">Total Votes: {totalVotes}</div>
        
      </div>
      <CommentSection pollId={pollId} showAllComments={showAllComments} comments={comments}/>
    </div>
  );
};

export default PollFeed;
