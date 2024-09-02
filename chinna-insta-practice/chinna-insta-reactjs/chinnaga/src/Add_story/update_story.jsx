import { useContext, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Header } from '../Header/Header';
import { UserContext } from '../JS_FILES/context';
import { useNavigate } from 'react-router-dom';



export function Update_Story() {
const user = useContext(UserContext)
    const [Addimage, setAddimage] = useState([]);
    const navigate = useNavigate()

    const [update_story, setUpdate_story] = useState([])
     const {
        register,
        handleSubmit,
        setValue
    } = useForm();

    useEffect (() => {
        if (user) {
            setValue("user_id" , user?.id);

        }
    },[user, setValue])

    async function saveStory(data) {
        let formData = new FormData();

        formData.append("user_id", user?.id)
        formData.append("Add_story", Addimage);

        const config = {
            headers: { "context-type": "multipart/form-data" }
        }

        const res = await axios.post("http://localhost:4008/SaveStory", formData, config);
        navigate("/myprofile")
    }

    function LoadStory(event) {
        var reader = new FileReader();
        reader.onload = function () {
            setAddimage(reader.result)
        }

        reader.readAsDataURL(event.target.files[0]) 
    }

    return (
        <> <Header />
            <div className="add_profile">
                <div>
                    <h4>Add Story</h4>

                </div>
                <form onSubmit={handleSubmit((data) => { saveStory(data) })}>

                    <input type="hidden" name="" id=""  {...register("user_id")} />
                    <input type="file" placeholder="Add_story" className='add_profile1' {...register("Add_story")} onChange={(event) => { LoadStory(event) }} /><br />

                    <button className='add_profile_btn'>Add Profile</button>
                </form>
            </div>
        </>
    )
}