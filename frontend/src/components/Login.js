import { Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader';
import './Login.css';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const location = useLocation();

    const submit = async e => {
        e.preventDefault() ;

        setLoading(true);
        setErrorMessage('');

        const user = {
            username: username,
            password: password
        };

        const { data } = await axios.post(
                'http://localhost:8000/token/',
                user, {
                    headers: {
                        'Content-Type': 'application/json',
                    }                 
                }, { withCredentials: true }    
        );

        localStorage.clear();

        if (!Object.is(data, undefined)) {
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            localStorage.setItem('username', username);
            window.dispatchEvent(new Event('storage'));
    
            axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
            
            const res = await axios.post(
                'http://localhost:8000/getuser/', 
                { username: username }, 
                { headers: {'Content-Type': 'application/json'}}, 
                { withCredentials: true }
            );
            console.log(res);
            
            setLoggedIn(true);
        } else {
            setErrorMessage('Oops, something went wrong');
        }
        setLoading(false);
    }

    const renderSignupMessage = () => {
        return (
            <div>
                <h2>
                    Welcome, {location.state.username}! <br />
                    An activation email was sent to: {location.state.email}
                </h2> 
            </div>
        )
    }

    return(
        <div>
            <div className="Signup-banner">
                {location.state !== null ? renderSignupMessage() : null}
            </div>
            <div className="Auth-form-container">
                {loggedIn && (
                    <Navigate to="/" replace={true} />
                )}
                <form className="Auth-form" onSubmit={submit}>
                    <div className='Error-message'>
                        {errorMessage}
                    </div>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input className="form-control mt-1"
                                placeholder="Enter username"
                                name="username"
                                type="text"
                                value={username}
                                required
                                onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input className="form-control mt-1"
                                placeholder="Enter password"
                                name="password"
                                type="text"
                                value={password}
                                required
                                onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="d-grid gap-3 mt-3">
                            <button type="submit" className="btn btn-primary">
                                {loading ? 
                                    <PulseLoader
                                        color={'#ffffff'}
                                        loading={loading}
                                        size={15}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                : "Submit"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;