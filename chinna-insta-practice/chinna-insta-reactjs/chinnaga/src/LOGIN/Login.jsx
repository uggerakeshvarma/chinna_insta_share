import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import homelogo from '../Assists/images/home logo.png';
import logo from '../Assists/images/logo.png';
import { setlocalStorage } from '../JS_FILES/auth.rout';
import { getregister } from '../JS_FILES/insta_account';
import './Login.css';

export function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    function register() {
        const UserName = document.getElementById("UserName").value;
        const Password = document.getElementById("Password").value;

        // Reset error message
        setError('');

        // Basic validation
        if (!UserName) {
            setError('Username is required.');
            return;
        }
        if (!Password) {
            setError('Password is required.');
            return;
        }

        getregister().then((res) => {
            let filterData = res.data.filter((item) => 
                item.UserName === UserName && item.Password === Password
            );

            if (filterData.length > 0) {
                setlocalStorage("UserData", filterData);

                alert("Successfully logged in...");
                navigate("/Frontpage");
            } else {
                setError('User does not exist or incorrect password.');
            }
        }).catch((err) => {
            setError('An error occurred while trying to log in.');
            console.error(err);
        });
    }

    return (
        <>
            <div className='login'>
                <div className='login-1'>
                    <img src={homelogo} alt="" className='login-img' width="480" />
                </div>
                <div className='log-head'>
                    <div className='login2'>
                        <img src={logo} alt="" />
                        <h4>Insta Share</h4>
                    </div>
                    <div className='mt-5'>
                        <label htmlFor="">USERNAME</label><br />
                        <input type="text" className='login1' id='UserName' />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="">PASSWORD</label><br />
                        <input type="password" className='login1' id='Password' />
                    </div>
                    <div>
                        <span className='login3'><input type="checkbox" />Remember Me</span>
                      <Link  className='looh' to='/requestotp'><span className='login4'>Forgot Password</span></Link>
                    </div>
                    {error && <div className='error'>{error}</div>}
                    <button className='Login_btn' onClick={register}>Login</button>
                    <div>
                        <span>I don't have an account?</span>
                        <Link to='/register' className='log'><span>Create Account</span></Link>
                    </div>
                </div>
            </div>
        </>
    );
}
