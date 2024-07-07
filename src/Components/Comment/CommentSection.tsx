import  { useState, ChangeEvent, FormEvent, useCallback, useEffect } from 'react';
import './CommentSection.css'; // Import CSS file for styling
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

export interface Comment{
  author:string;
  content:string;
  _id:string;
}
declare const REACT_APP_BACKEND_URL: string;

const CommentSection = (props: any) => {

  const [comments, setComments] = useState<Comment[]>(props.comments);
  const [newComment, setNewComment] = useState<string>('');
  const { token, userName } = useSelector((state: any) => state.auth);
  const url:string = process.env.REACT_APP_BACKEND_URL as string;

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setNewComment(event.target.value);
  };
  // const socket = useSocket();
  const handleCommentSubmit = useCallback(async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (newComment.trim() === '') return;

    const commentObject = {
      content: newComment,
      pollId: props.pollId,
    };
  
    try {
      const res = await axios.post(`${url}comment`, commentObject, {
        headers: { Authorization: token },
      });
      props.socket.emit('newComment', { ...res.data, author: userName } )

 
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  }, [newComment, comments, props.pollId, token, userName]);
  
  useEffect(() =>{
    
    props.socket.on('newComment', (comment:any) =>{
      
      if(props.pollId === comment.pollId) setComments([...comments, comment]);
    })
  })

  return (
    <div className="comment-section">
      <h5>Comments</h5>
    
      <ul className="comment-list">
        {comments.length>0 && 
        comments.map((comment:Comment) => (
          
          <li key={comment?._id} className="comment">
            <div className='d-flex'>
            
              <div className="comment-author">{comment?.author}</div>
              <div className="comment-text ms-3">{comment?.content}</div>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          rows={2}
          required
        />
        <button className='btn btn-primary' type="submit">Post Comment</button>
      </form>
      {!props.showAllComments && comments.length > 0 && <Link to={'/'+props.pollId}>View more comments...</Link>}
    </div>
  );
};

export default CommentSection;
