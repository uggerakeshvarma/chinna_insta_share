import axios from "axios";
import { useState } from "react"
import { useForm } from "react-hook-form"



export function Add_Other_profile() {
    const [otherprofile, setotherprofile] = useState([])

    const {
        register,
        handleSubmit
    } = useForm()


    async function saveotherdata(data) {
        let formData = new FormData();

        formData.append("UserName", data.UserName);
        formData.append("image", otherprofile);

        const config = {
            headers: { "context-type": "multipart/form-data" }
        };

        const res = await axios.post("http://localhost:4008/saveotherprofile", formData, config);
        window.location.reload();

    }

    function  Loadotherimage(event){
        var reader = new FileReader();
        reader.onload = function() {
            setotherprofile(reader.result)
        }

        reader.readAsDataURL(event.target.files[0])
    }
    return (
        <>
            <form onSubmit={handleSubmit((data) => { saveotherdata(data) })}>
                <h4>Add other Porofile </h4>
                <input type="text" name="" id="" b placeholder="UserName" {...register("UserName")} /> <br />
                <input type="file" name="" id="" placeholder="Iamge" {...register("image")} onChange={(event) => { Loadotherimage(event) }} /> <br />

                <button>Update</button>

            </form>
        </>
    )
}