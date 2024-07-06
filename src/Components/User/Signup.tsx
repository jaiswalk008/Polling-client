import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../UI/Input' // Make sure the Input component is properly imported
import './User.css';

const Signup = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const signupHandler = async (e: FormEvent) => {
        e.preventDefault();

        const userDetails = {
            name,
            email,
            password,
        };

        try {
           const res = await axios.post(import.meta.env.VITE_BACKEND_URL+'signup', userDetails);
           console.log(res.data)
            // navigate('/login');
            setErrorMessage('');
        } catch (error: any) {
            console.error('Signup error:', error);
            setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <>
            <header className="bg-dark text-light">
                <h2 className="title">Polling App</h2>
            </header>
            <div className="form-container">
                <div>
                    <h2>SignUp</h2>
                    <form onSubmit={signupHandler}>
                        <Input id="name" label="Name" type="text" value={name} onChange={nameChangeHandler} />
                        <Input id="email" label="Email" type="email" value={email} onChange={emailChangeHandler} />
                        <Input id="password" label="Password" type="password" value={password} onChange={passwordChangeHandler} />
                        <button type="submit" className="btn w-100 mt-1 btn-dark">Signup</button>
                    </form>
                    {errorMessage && <p className="message-alert">{errorMessage}</p>}
                </div>
                <p className="login">
                    <Link to="/login">Have an account? Login</Link>
                </p>
            </div>
        </>
    );
};

export default Signup;
