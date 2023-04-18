import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './Signup.css';

const Signup = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const submit = async e => {
        e.preventDefault();
        
        const user = {
            username: username,
            email: email,
            password: password
        };

        /** @TODO Form validation **/

        const {data} = await axios.post(
            'http://localhost:8000/signup/',
            user, {
                headers: {
                    'Content-Type': 'application/json',
                }                 
            }, { withCredentials: true }    
        );

        if (data !== undefined) {setShouldRedirect(true);}

        console.log('data! ', data);
        /** @TODO Redirect on HTTP_200 **/
    }

    return (
        <div className="Signup-form-container">
            { shouldRedirect && 
                <Navigate to='/login' 
                    state={{ email: email, username: username }} 
                    replace={true}/>}
            <form className="Signup-form" onSubmit={submit}>
                <div className="Signup-form-content">
                    <h2 className="Signup-form-title">Sign Up</h2>
                    <div className="form-group mt-1">
                        <label>Username</label>
                        <input className="form-control mt-1" 
                            placeholder="BoatyMcBoatface123" 
                            name="username" 
                            type="text" 
                            value={username} 
                            required 
                            onChange={e => {setUsername(e.target.value)}} />
                    </div>
                    <div className="form-group mt-1">
                        <label>Email</label>
                        <input className="form-control mt-1" 
                            placeholder="jake123@gmail.com" 
                            name="email" 
                            type="email" 
                            value={email} 
                            required 
                            onChange={e => {setEmail(e.target.value)}} />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input className="form-control mt-1" 
                            placeholder="" 
                            name="password" 
                            type="password" 
                            value={password} 
                            required 
                            onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label>Confirm Password</label>
                        <input className="form-control mt-1" 
                            placeholder="" 
                            name="confirm_password" 
                            type="password" 
                            value={confirmPassword} 
                            required 
                            onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="d-grid gap-3 mt-4 mb-3">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup;