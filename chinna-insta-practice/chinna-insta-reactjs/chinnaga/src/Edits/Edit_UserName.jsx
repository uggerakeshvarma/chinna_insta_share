
import { useEffect, useState } from 'react';
import './Edit_UserName.css';
import { Header } from '../Header/Header';


export function Edit_UserName(){

    const [pic, setPic] = useState([])
    useEffect(() => {
        Editpic()
    }, [])


    function Editpic() {
        let data = localStorage.getItem("UserData");
        setPic(JSON.parse(data)[0])
       

    }
    return(
        <>
        <Header></Header>
        <form className='username'   method='post'  action='http://localhost:4008/EdituserName' >
            <h5>Edit Username</h5>
            <input type="hidden" name="id" defaultValue={pic.id} id="" />
            <input type="text" name="UserName" id=""  defaultValue={pic.UserName} className='username1'/> <br />
            <button className='username-btn'>Submit</button>
        </form>
        </>
    )
}