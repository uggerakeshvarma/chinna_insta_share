
import { useContext, useEffect, useState } from 'react';

import { Header } from '../Header/Header';
import { Form, useForm } from 'react-hook-form';
import { UserContext } from '../JS_FILES/context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export function Edit_Story() {
    const navigate =  useNavigate()
    const user = useContext(UserContext)
    const [StoryUpadet, setStoryUpadet] = useState([])
    const {
        register,
        handleSubmit
    } = useForm();


    async function updatestory(data) {
        let formData = new FormData();


        formData.append("user_id", user?.id);
        formData.append("Add_story", StoryUpadet);
        const config = {
            headers: { "content-type": "multipart/form-data" }
        };
        const res = await axios.post("http://localhost:4008/updatestory", formData, config)
        console.log("Response:", res);
        navigate("/myprofile")



    }

    function loadstory(event) {
        var reader = new FileReader();
        reader.onload = function () {
            setStoryUpadet(reader.result);

        }
        reader.readAsDataURL(event.target.files[0])
     
    };

    return (
        <>
            <Header></Header>
            <form className='username' onSubmit={handleSubmit((data) => { updatestory(data) })}   >
                <h5>Edit Username</h5>
                <input type="file" id="" className='username1' {...register("Add_story")} onChange={(event) => loadstory(event)} /> <br />
                <button className='username-btn' type=''>Submit</button>
            </form>
        </>
    )
}