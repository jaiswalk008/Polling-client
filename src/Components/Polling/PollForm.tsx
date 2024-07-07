import  { useState, ChangeEvent } from 'react';
import './Polling.css';
import { useDispatch, useSelector } from 'react-redux';
import { pollActions } from '../Context/store';
import axios from 'axios';

const PollForm= (props:any) => {
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState<string[]>(['', '', '', '']);

  const dispatch = useDispatch();
  const {token,profilePhotoURL,userName} = useSelector((state:any)=>state.auth)
  const handleChoiceChange = (index: number, value: string) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  
  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };
  const onCreatePoll = async () =>{
    
    const options = choices
  .filter(text => text.length > 0) 
  .map(text => ({ text, count: 0 }));

    const pollData = {
      question,
      options,
    }
    const res = await axios.post(import.meta.env.VITE_BACKEND_URL+'poll',pollData,{
      headers:{Authorization:token}
    })
    // console.log(res.data)
    props.onCancel(false);
    
    dispatch(pollActions.addToPoll({...res.data ,comments:[], userId:{name:userName , profilePhotoURL}}));
  }
 

  return (
    <div className="poll-form">
      <h3></h3> 
      <input type='text' value={question} onChange={handleQuestionChange} className='form-control mb-3' placeholder='Ask a question'/>
      {choices.map((choice, index) => (
        <div key={index} className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={`Choice ${index + 1}${index > 1 ? ' (optional)' : ''}`}
            value={choice}
            onChange={(e) => handleChoiceChange(index, e.target.value)}
          />
        </div>
      ))}
    
      <div className='d-flex'>
      <button onClick={onCreatePoll} className='btn btn-light w-100 mt-2 me-2'>Create Poll</button>
      <button onClick={()=>props.onCancel(false)} className='btn btn-danger w-100 mt-2 '>Cancel</button>

      </div>
    </div>
  );
};

export default PollForm;
