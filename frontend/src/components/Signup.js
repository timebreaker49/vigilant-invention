import { useState } from "react";
import './Signup.css';

const Signup = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const submit = async e => {
        e.preventDefault()
        console.log(
            `email: ${email}, \npassword: ${password}, \ncPassword: ${confirmPassword}`
        );
    }

    return (
        <div className="Signup-form-container">
            <form className="Signup-form" onSubmit={submit}>
                <div className="Signup-form-content">
                    <h2 className="Signup-form-title">Sign Up</h2>
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