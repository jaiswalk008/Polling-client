import React, { useEffect, useMemo, useState } from 'react';
import './Polling.css'; // Import your CSS file for styling
import {  useSelector } from 'react-redux';
import axios from 'axios';
import { Option } from '../Context/poll';
import CommentSection, { Comment } from '../Comment/CommentSection';
import { Socket } from 'socket.io-client';

interface PollFeedProps {
  pollId: string;
  hasVoted: boolean;
  question: string;
  options: Option[];
  userName: string;
  profilePhotoURL: string;
  comments: Comment[];
  showAllComments: boolean;
  socket: Socket;
}

const PollFeed: React.FC<PollFeedProps> = ({
  pollId,
  question,
  options,
  hasVoted,
  userName,
  profilePhotoURL,
  comments,
  showAllComments,
  socket,
}) => {
  const url:string = process.env.REACT_APP_BACKEND_URL as string;
  
  const [canVote, setCanVote] = useState(!hasVoted);
  const { token } = useSelector((state: any) => state.auth);
  const [updatedOptions, setUpdatedOptions] = useState(options);

  const handleVote = async (optionId: string, pollId: string) => {
    if (canVote) {
      socket.emit('vote', { pollId, optionId });
      await axios.patch(`${url}poll`, { optionId, pollId }, { headers: { Authorization: token } });

      setCanVote(false);
    }
  };

  useEffect(() => {
    const handleVoteEvent = (data: any) => {
      if (pollId === data.pollId) {
        setUpdatedOptions((prevOptions) =>
          prevOptions.map((option) =>
            option._id === data.optionId ? { ...option, count: option.count + 1 } : option
          )
        );
      }
    };

    socket.on('vote', handleVoteEvent);

    return () => {
      socket.off('vote', handleVoteEvent);
    };
  }, [pollId, socket]);

  const totalVotes = useMemo(() => updatedOptions.reduce((acc, curr) => acc + curr.count, 0), [updatedOptions]);

  return (
    <div className="container mt-3 poll-feed">
      <div className="d-flex">
        <img className="profile-photo" src={profilePhotoURL} alt="Profile" />
        <strong className="mt-2">{userName}</strong>
      </div>
      <div className="question">
        <p>Q. {question}</p>
        {updatedOptions.map((option) => (
          <div key={option._id} onClick={() => handleVote(option._id, option.pollId)} className="option">
            {option.text}
            {!canVote && (
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
      <CommentSection socket={socket} pollId={pollId} showAllComments={showAllComments} comments={comments} />
    </div>
  );
};

export default PollFeed;
