import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Using react-toastify for toast messages
import 'react-toastify/dist/ReactToastify.css';
import './verifyotp.css';
import { Header } from '../Header/Header';
import homelogo from '../Assists/images/home logo.png';
import { Navigate, useNavigate } from 'react-router-dom';

// Initialize toast notifications


function VerifyOTP() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otpError, setOtpError] = useState(false);

    const handleVerifyOTP = async () => {
        try {
            const formdata = new FormData();
            formdata.append("Email", email);
            formdata.append("otp", otp);
            formdata.append("Password", newPassword);

            const config = {
                headers: { "Content-Type": "multipart/form-data" }
            };

            const res = await axios.post("http://localhost:4008/saveotp", formdata, config);
            navigate("/")
            if (res.data.success) {
                toast.success("Password changed successfully", { autoClose: 2000 });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                toast.error(res.data.message, { autoClose: 2000 });
                setOtpError(true);
            }
        } catch (error) {
            toast.error("Incorrect email/OTP/password", { autoClose: 2000 });
            setOtpError(true);
        }
    };

    return (
        <>
            <Header />
            <div className='verift-otp'>

                <div>
                    <img src={homelogo} alt="" className='reqotp' />
                </div>
                <div className='verify'>
                    <h2 className='verify2'>Verify OTP and Reset Password</h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        className='verify1'
                        onChange={(e) => setEmail(e.target.value)}
                    /><br />
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        className='verify1'
                        onChange={(e) => setOtp(e.target.value)}
                    /><br />
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        className='verify1'
                        onChange={(e) => setNewPassword(e.target.value)}
                    /><br />
                    <button className='verify3' onClick={handleVerifyOTP}>Verify OTP and Reset Password</button><br />
                </div>
            </div>
        </>
    );
}

export default VerifyOTP;
