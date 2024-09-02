import { Route, Routes } from "react-router-dom";
import { Header } from "./Header/Header";
import { Login } from "./LOGIN/Login";
import { Register } from "./Register/Register";
import { Frontpage } from "./frontpage/frontpage";
import { Image_Bind } from "./IMAGE_BIND/image_bind";
import { My_Profile } from "./MY_PROFILE/My_profile";
import { Other_Profile } from "./Other_profile/Other_profile";
import { Add_Profile } from "./ADD_PROFILE/Add_Profile";
import { Add_Other_profile } from "./ADD_OTHER_PROFILE/Add_other_profile";
import { Add_Post } from "./Add_post/Add_pst";
import { Add_Story } from "./Add_story/Add_story";
import { Edit_UserName } from "./Edits/Edit_UserName";
import { Edit_Story } from "./Edits/editstory";
import { UpDate_profile } from "./Update image/update_image";
import RequestOTP from "./otp/otpsend";
import VerifyOTP from "./otp/varifyotp";
import { Update_Story } from "./Add_story/update_story";
import { Cuse } from "./cuse/cuse";


export function AppRouter(){
    return(
        <Routes>
            <Route path="/header" element={<Header></Header>}></Route>
            {/* <Route path="/Login" element={<Login></Login>}></Route> */}
            <Route path="/" element={<Login></Login>}></Route>
            <Route path="/Register" element={<Register></Register>}></Route>
            <Route path="/frontpage" element={<Frontpage></Frontpage>}></Route>
            <Route path="/image_bind"  element={<Image_Bind></Image_Bind>}></Route>
            <Route path="/Myprofile"  element={<My_Profile></My_Profile>}></Route>
            <Route path="/Other_profile/:user_id" element={<Other_Profile></Other_Profile>}></Route>
            <Route path="/addimage"  element={<Add_Profile></Add_Profile>}></Route>
            <Route path="/addotherprofile" element={<Add_Other_profile></Add_Other_profile>}></Route>
            <Route path="/add_post" element={<Add_Post />}></Route>
            <Route path="/Add_story" element={<Add_Story></Add_Story>}></Route>
            <Route path="/username" element={<Edit_UserName />}></Route>
            <Route path="/editstory" element={<Edit_Story></Edit_Story>}></Route>
            <Route path="/update_profile" element={<UpDate_profile></UpDate_profile>}></Route>

            <Route path="/requestotp" element={<RequestOTP /> }></Route>
            <Route path="/varifyotp" element={<VerifyOTP></VerifyOTP>}></Route>
            <Route path="/update_story" element={<Update_Story></Update_Story>}></Route>

            <Route path="/cuse" element={<Cuse></Cuse>}></Route>
           
         


        </Routes>
    )
}