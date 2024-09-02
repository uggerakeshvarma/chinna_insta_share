import axios from "axios";

//get
export function read (url){
return axios.get(url)
};
//save

export function save(url, data){
return axios.post(url, data)
} 

//update 
export function update (url,data) {
    return axios.put(url, data)
}


//delete 
export function deleteitem (url){
    return axios.deleteitem(url)
}