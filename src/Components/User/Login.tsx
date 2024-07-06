import { ChangeEvent, FormEvent, useState } from 'react';
import './User.css';
import Input from '../UI/Input'
import axios from 'axios';
import {  Link, useNavigate } from 'react-router-dom';
 
import { useDispatch  } from 'react-redux';
import { authActions } from '../Context/store';
const Login = () => {
    const [email , setEmail] = useState<string>('');
    const [password , setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
   
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const emailChangeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
    }
    const passwordChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {setPassword (e.target.value)}
    const loginHandler = async (e:FormEvent) =>{
        e.preventDefault();
        const userDetails ={
           email,password
        }
        try {
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL+'login/', userDetails);
            console.log(res.data);
            setErrorMessage('');
            dispatch(authActions.setToken(res.data.token));
            dispatch(authActions.setUserName(res.data.userName));

         
            
        } catch (err:any) {
            console.log(err);
            setErrorMessage(err.response.data.message);
        }
    }

    return (
        <>
            <header className="bg-dark text-light">
                <h2 className="title">Polling App</h2>
            </header>
            <div className='form-container'>
        <div>
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
                <Input id="email" label="Email" type="email" value={email} onChange={emailChangeHandler} />
                <Input id="password" label="Password" type="password" value={password} onChange={passwordChangeHandler} />
                
                <button className='btn w-100 mt-1 btn-dark'>Login</button>
            </form>
            {errorMessage.length>0 && <p className='message-alert'>{errorMessage}</p>}
           
            </div>
            <p className='signup'><Link to="/signup">Don't have an account? Signup</Link></p>
        </div>
        </>
    )
}
export default Login;