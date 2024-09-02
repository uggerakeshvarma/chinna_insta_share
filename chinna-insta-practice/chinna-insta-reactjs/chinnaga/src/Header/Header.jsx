import { Search } from 'react-bootstrap-icons';
import logo from '../Assists/images/logo.png';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import store from '../JS_FILES/Reduc.Stores';
import axios from 'axios';
import { type } from '@testing-library/user-event/dist/type';


export function Header() {

    const [userlogin, setUserLogin] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        logdin();

    }, [])

    function logdin() {
        store.subscribe(() => {
            let user = store.getState()?.user
            if (user != null && user != undefined) {
                setUserLogin(true)
            }
            else {
                setUserLogin(false)
            }
        })
    }


    function Logout() {
        localStorage.removeItem("UserData")
        // window.location.reload();

        
        // let action = { type: "login", data: null };
        // store.dispatch(action);
        navigate("/")
    }

    const searchProducts = useRef();
    async function SearchForProducts() {
        let formData = new FormData();

        formData.append("UserName", searchProducts.current.value);


        
        const config = {
            headers: { "content-type": "multipart/form-data" }

        }
        const res = await axios.post("http://localhost:4008/SearchName", formData, config);
        store.dispatch({ type: "product", data: res.data })
    }

    return (
        <>
            <div className='header'>
                <div className='header-0'>
                    <img src={logo} alt=""  className='header-12' />
                    <h4 className='header-1'>insta Share</h4>
                </div>

                <div className='header1'>
                    <input type="text" className='header2' placeholder='Search Caption...' ref={searchProducts} />
                    <span className='header4' onClick={() => { SearchForProducts() }}><Search className='header3'></Search></span>
                </div>
                <div className='header5'>
                    <Link to='/Frontpage' className='headerr'><h6 className='header5-1'>Home</h6></Link>
                    <Link to='/myprofile' className='headerr' > <h6 className='header5-1'>Profile</h6></Link>

                    {
                        userlogin == false &&
                        <button className='header-logout ' onClick={() => { Logout() }}>Logout</button>
                    }

                </div>
            </div>
        </>
    )
}

