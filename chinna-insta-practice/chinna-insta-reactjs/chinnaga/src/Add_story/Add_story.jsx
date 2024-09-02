import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Header } from '../Header/Header';
import { useNavigate } from 'react-router-dom';

export function Add_Story() {
    const [Addimage, setAddimage] = useState([]);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    async function saveStory(data) {
        let formData = new FormData();

        formData.append("user_id", data.user_id);
        formData.append("Add_story", Addimage);

        const config = {
            headers: { "content-type": "multipart/form-data" }
        };

        try {
            const res = await axios.post("http://localhost:4008/SaveStory", formData, config);

            if (res.status === 200) { // Successfully saved
                navigate("/myprofile"); // Navigate to My Profile page
            } else {
                console.error("Failed to save the story");
            }
        } catch (error) {
            console.error("Error occurred while saving the story:", error);
        }
    }

    function LoadStory(event) {
        var reader = new FileReader();
        reader.onload = function () {
            setAddimage(reader.result);
        }

        reader.readAsDataURL(event.target.files[0]);
    }

    return (
        <> 
            <Header />
            <div className="add_profile">
                <div>
                    <h4>Add Story</h4>
                </div>
                <form onSubmit={handleSubmit(saveStory)}>
                    <input type="text" {...register("user_id")} />
                    <input type="file" className='add_profile1' {...register("Add_story")} onChange={LoadStory} /><br />
                    <button className='add_profile_btn'>Add Profile</button>
                </form>
            </div>
        </>
    );
}
