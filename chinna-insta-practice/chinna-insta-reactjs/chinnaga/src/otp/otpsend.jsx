import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './otpsend.css';
import { Header } from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import homelogo from '../Assists/images/home logo.png';
export function RequestOTP() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { register } = useForm();

    async function sentotp(email) {
        let formData = new FormData();
        formData.append("Email", email);

        const config = {
            headers: { "Content-Type": "multipart/form-data" }
        };

        try {
            let res = await axios.post("http://localhost:4008/sentotp", formData, config);
       
            if (res.status === 200) {
                setMessage('OTP sent successfully');
                setTimeout(() => {
                    navigate("/varifyotp");
                }, 2000); // Navigate to /verifyotp after 2 seconds
            } else {
                setMessage('Failed to send OTP');
            }
        } catch (error) {
            console.error("Error occurred:", error);
            setMessage('Error occurred while sending OTP');
        }
    }

    const handleSendOTP = () => {
        sentotp(email);
    };

    return (
        <>
            <Header />
            <div className='otpreq'>

            <div>
                <img src={homelogo} alt=""  className='reqotp'/>
            </div>
            <div className='otpsend'>
                <h2 className='otpsend1'>Request OTP</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    className='otpsend2'
                    {...register("Email")}
                    onChange={(e) => setEmail(e.target.value)}
                /> <br />
                <button className='otpsend3' onClick={handleSendOTP}>Send OTP</button>
                {message && <p>{message}</p>}
            </div>
            </div>
        </>
    );
}

export default RequestOTP;
