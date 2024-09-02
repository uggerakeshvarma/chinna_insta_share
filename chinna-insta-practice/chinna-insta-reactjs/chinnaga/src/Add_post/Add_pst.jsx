import { useContext, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Header } from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../JS_FILES/context';



export function Add_Post() {
    const navigate = useNavigate()
    const user = useContext(UserContext)
    const [Addimage, setAddimage] = useState([]);
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


    async function savepost(data) {
        let formData = new FormData();

        formData.append("user_id", user?.id);
        formData.append("caption", data.caption);
        formData.append("add_post", Addimage);

        const config = {
            headers: { "context-type": "multipart/form-data" }
        }

        const res = await axios.post("http://localhost:4008/save_post", formData, config);
        console.log("Response:", res);
        navigate("/myprofile");
    }

    function Loadpost(event) {
        var reader = new FileReader();
        reader.onload = function () {
            setAddimage(reader.result)
        }

        reader.readAsDataURL(event.target.files[0])
    }

    return (
        <>
            <Header />
            <div className="add_profile">
                <div>
                    <h4>Add Post</h4>

                </div>
                <form onSubmit={handleSubmit((data) => { savepost(data) })}>

                   <input type="hidden"  {...register("id")}  />
                   <input type="text" className='add_profile1' placeholder='caption' {...register("caption")} />
                    <input type="file" placeholder="add_post" className='add_profile1' {...register("add_post")} onChange={(event) => { Loadpost(event) }} /><br />

                    <button className='add_profile_btn'>Add Profile</button>
                </form>
            </div>
        </>
    )
}