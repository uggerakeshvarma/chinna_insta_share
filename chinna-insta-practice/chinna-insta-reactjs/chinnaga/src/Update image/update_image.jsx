import { useForm } from "react-hook-form";
import { Header } from "../Header/Header";
import { useContext, useState } from "react";
import { UserContext } from "../JS_FILES/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export function UpDate_profile() {
  const navigate = useNavigate()  
const {
    register,
    handleSubmit
} = useForm();

const user = useContext(UserContext);

const [update_profile, setUpdate_profile] = useState([])


async function saveprofile(data) {
    let formData = new FormData();

    formData.append("user_id", user?.id);
    formData.append("user_image", update_profile);


    const config = {
        headers: { "content-type": "multipart/form-data" }
    }

    const res = await axios.post("http://localhost:4008/updateprofile", formData,config);
    console.log("Response:", res);
    navigate("/myprofile")
   
}
function loadprofile(event){
    var reader = new FileReader();
    reader.onload= function(){
        setUpdate_profile(reader.result);
    }

    reader.readAsDataURL(event.target.files[0]) 
}
    return (
        <>
            <Header></Header>
            <form className='username'    onSubmit={handleSubmit((data) => {saveprofile(data)})} >
                <h5>Update profile</h5>
                <input type="file" className='user_image' {...register("user_image")}  onChange={(event ) => loadprofile(event)} /> <br />
                <button className='username-btn'>Submit</button>
            </form>
        </>
    )
}
