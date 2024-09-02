import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import homelogo from '../Assists/images/home logo.png';
import logo from '../Assists/images/logo.png';
import './Register.css';
import { useState } from 'react';

// Validation schema using yup
const schema = yup.object().shape({
    UserName: yup.string()
        .required('Username is required')
        .matches(/^[a-zA-Z0-9]*$/, 'No special characters allowed in Username'),
    Email: yup.string()
        .required('Email is required')
        .email('Invalid email format'),
    Password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long'),
});

export function Register() {
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            

          
            const response = await fetch('http://localhost:4008/saveuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Registration successful!');
                navigate('/');
            } else {
                const { message } = await response.json();
                if (message.includes('already exists')) {
                    setEmailError('Email is already registered');
                }
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <div className='register'>
                <div className='login-1'>
                    <img src={homelogo} alt="" className='login-img' width="480" />
                </div>
                <form className='register1' onSubmit={handleSubmit(onSubmit)}>
                    <div className='login2'>
                        <img src={logo} alt="" />
                        <h4>Insta Share</h4>
                    </div>
                    <div>
                        <label htmlFor="">USERNAME</label> <br />
                        <input type="text" {...register('UserName')} className='register2' />
                        {errors.UserName && <p className="error">{errors.UserName.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="">EMAIL</label> <br />
                        <input type="email" {...register('Email')} className='register2' />
                        {errors.Email && <p className="error">{errors.Email.message}</p>}
                        {emailError && <p className="error">{emailError}</p>}
                    </div>
                    <div>
                        <label htmlFor="">PASSWORD</label> <br />
                        <input type="password" {...register('Password')} className='register2' />
                        {errors.Password && <p className="error">{errors.Password.message}</p>}
                    </div>
                    <button className='register-btn' type='submit'>Register</button>
                    <div>
                        <span>Already Have account?</span>
                        <Link to="/" className='registerr'><span>Login</span> </Link>
                    </div>
                </form>
            </div>
        </>
    );
}
