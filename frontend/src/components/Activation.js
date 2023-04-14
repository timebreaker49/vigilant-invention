import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Activation = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const uid = queryParams.get("uid");
    const [message, setMessage] = useState('');

    useEffect(() => {
        const activateAccount = () => {
            axios.post(
                `http://localhost:8000/activate/${uid}/${token}/`
            ).then(res => {
                if (res.status === 200) {
                    setMessage(res.data);
                }
            }).catch(err => console.log(err.response.data));
        }
        activateAccount();
    }, [uid, token]);

    return (
        <div className="form-signin mt-5 text-center">
            <h3> { message } </h3>
        </div>
    )

}

export default Activation;