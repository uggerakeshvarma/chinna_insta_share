
import nopost from '../Assists/images/Group 7355.png';
import nostory from '../Assists/images/th (7).jpg';


import { Header } from '../Header/Header';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Other_profile.css';



export function Other_Profile() {
    const [special, setSpecial] = useState([]);
    const [user, setUser] = useState([]);
    const [user1, setUser1] = useState([]);
    const [user2, setUser2] = useState([]);

    const { user_id } = useParams();

    useEffect(() => {
        singleprice();
        singleusername();
        singlestory();
        singlepost();
    }, [user_id]);

    async function singleprice() {
        const res = await axios.get(`http://localhost:4008/singleprofile/${user_id}`);
        setSpecial(res.data);
    }

    async function singleusername() {
        const res = await axios.get(`http://localhost:4008/singleusername/${user_id}`);
        setUser(res.data);
    }

    async function singlestory() {
        const res = await axios.get(`http://localhost:4008/singlestory/${user_id}`);
        setUser1(res.data);
    }

    async function singlepost() {
        const res = await axios.get(`http://localhost:4008/singlepost/${user_id}`);
        setUser2(res.data);
    }

    return (
        <>
            <Header />

            <div className='my_profile'>
                <div className='my_profil'>
                    <div className='otgg'>
                        {special && special.map((item) => (
                            <div key={item.id} className='d-flex'>
                                <div>
                                    <img src={item.user_image} alt="" className='other' />
                                </div>
                            </div>
                        ))}

                        {user && user.map((item) => (
                            <div key={item.id} className='myppr'>
                                <div>
                                    <span className='other1'>{item.UserName}</span><br />
                                    <span className='my_profil1'><span>79</span> <span>Posts</span></span>
                                    <span className='my_profile1'><span>79</span> <span className='ms-1'>followers</span></span>
                                    <span className='my_profile1'><span>79</span> <span>following</span></span>
                                </div>
                                <div>
                                    <h4 className='other2'>chinna_rakhi</h4>
                                    <p className='myprofilr2'>It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.</p>
                                </div>
                            </div>
                        ))}
                    </div> <br />

               <div className='athe'>
               {user1.length > 0 ? (
                        user1.map((item) => (
                            <div key={item.id} className='athe1'>
                                <img src={item.Add_story} alt="" className='my_profile3' />
                            </div>
                        ))
                    ) : (
                        <div className='athe2'>
                            <img src={nostory} alt="" className='athe3' />
                           
                        </div>
                    )}
               </div>
                </div>

                <div className='my_pro'>
                    {user2.length > 0 ? (
                        user2.map((item) => (
                            <img key={item.id} src={item.add_post} alt="" className='my_post' />
                        ))
                    ) : (
                        <div className='nth'>
                            <img src={nopost}     />
                            <p>No posts available</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
