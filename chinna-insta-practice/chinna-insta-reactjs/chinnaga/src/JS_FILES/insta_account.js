import { read } from "./service.context";

const getregisterurl = "http://localhost:4008/getRegister"

export function getregister(){
    return read(getregisterurl)
}


const getprofileimageurl  ="http://localhost:4008/getprofileimage"

export function Get_profile_image(){
    return read(getprofileimageurl)
}

const getotherprofileurl = "http://localhost:4008/getOtherprofile"
export function getOtherprofile(){
    return read(getotherprofileurl)
}

//getpost

const Getposturl = "http://localhost:4008/Getpost"
export function Getpost(){
    return read(Getposturl)
}

//get Story

const GetStoryurl = "http://localhost:4008/GetStory"
export function GetStory(){
    return read(GetStoryurl)
}

//view
const getviewurl = "http://localhost:4008/view" 
export function getview() {
    return read(getviewurl)
}