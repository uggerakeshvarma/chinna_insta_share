import { useState } from 'react';
import './Add_Profile.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';



export function Add_Profile() {

    const [Addimage, setAddimage] = useState([]);
    const {
        register,
        handleSubmit
    } = useForm();

    async function saveData(data) {
        let formData = new FormData();

        formData.append("user_id", data.user_id);
        formData.append("user_image" , Addimage);

        const  config = {
            headers: { "context-type": "multipart/form-data" }
        }

        const res = await axios.post("http://localhost:4008/saveprofileimage" , formData,config);
        window.location.reload();
    }

    function Loadimage (event){
        var reader = new FileReader();
        reader.onload = function() {
            setAddimage(reader.result)
        }

        reader.readAsDataURL(event.target.files[0])
    }

    return (
        <>
            <div className="add_profile">
                <div>
                    <h4>Add Profile</h4>

                </div>
                <form  onSubmit={handleSubmit((data) => { saveData(data) })}>
                    <input type="text" placeholder="user_id" className='add_profile1' {...register("user_id")} /> <br />
                    <input type="file" placeholder="addimage" className='add_profile1' {...register("user_image")}  onChange={(event) => {Loadimage(event)}} /><br />

                    <button className='add_profile_btn'>Add Profile</button>
                </form>
            </div>
        </>
    )
}