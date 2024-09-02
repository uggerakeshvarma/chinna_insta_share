import './My_profile.css';
import noimage from '../Assists/images/logo.png';
import nophoto from '../Assists/images/noo.jpg';
import notyet from '../Assists/images/Group 7355.png';
import nostory from '../Assists/images/th (7).jpg';
import { useContext, useEffect, useState } from 'react';

import { Header } from '../Header/Header';
import { Link } from 'react-router-dom';
import { UserContext } from '../JS_FILES/context';
import axios from 'axios';
import { Grid3x3 } from 'react-bootstrap-icons';

export function My_Profile() {
    const [profileimage, setProfileimage] = useState([]);
    const [post, setPost] = useState([]);
    const [Story, setStory] = useState([]);

    const user = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                await getupdatepic();
                await getupdatepost();
                await getupdatestory();
            }
        };
        fetchData();
    }, [user]);

    const getupdatestory = async () => {
        if (user?.id) {
            const res = await axios.get(`http://localhost:4008/getupdatestory/${user.id}`);
            setStory(res.data);
        }
    };

    const getupdatepic = async () => {
        if (user?.id) {
            const res = await axios.get(`http://localhost:4008/getupdatepic/${user.id}`);
            setProfileimage(res.data);
        }
    };

    const getupdatepost = async () => {
        if (user?.id) {
            const res = await axios.get(`http://localhost:4008/getupdatepost/${user.id}`);
            setPost(res.data);
        }
    };

    const [showw, setShoww] = useState(false);

    const Defoult = () => {
        setShoww(!showw);
    };

    return (
        <>
            <Header />
            <div className='my_profile'>
                <div className='my_profil'>
                    <div className='my-pofff'>
                        {profileimage.length > 0 ? (
                            profileimage.map((item) => (
                                <div key={item.id}>
                                    <img src={item.user_image && item.user_image !== "" ? item.user_image : nophoto} alt="" className='my_im' />
                                </div>
                            ))
                        ) : (
                            <div>
                                <img src={nophoto} alt="" className='my_im' />
                            </div>
                        )}
                        <div></div>
                        <div className=' my_im1'>
                            <span className='mypofile11'>{user?.UserName}</span><br />
                            <div>
                                <span className='my_profil1'><span>79</span> <span>Posts</span></span>
                                <span className='my_profile1'><span>79</span> <span>followers</span></span>
                                <span className='my_profile1'><span>79</span> <span>Following</span></span>
                            </div>
                            <div>
                                <h6 className='mypofile11'>chinna_rakhi</h6>
                                <p className='myprofilr2'>
                                    It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.
                                </p>
                            </div>
                        </div>
                        <div>
                            <button className='myprofilr3' onClick={Defoult}>Edit</button>
                            {showw && (
                                <div className='all-0'>
                                    <Link to='/update_story' className='my-orofileee'>
                                        <span className='all-1'>Story</span><br />
                                    </Link>
                                    <Link to='/Add_post' className='my-orofileee'>
                                        <span>Post</span><br />
                                    </Link>
                                    <Link to='/username' className='my-orofileee'>
                                        <span>UserName</span><br />
                                    </Link>
                                    <Link to='/update_profile' className='my-orofileee'>
                                        <span>Update_profile</span><br />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    <div></div>

                    <div className='my-pofile122'>
                        {Story.length > 0 ? (
                            Story.map((item) => (
                                <div className='my-pofile123' key={item.id}>
                                    <img src={item.Add_story} alt="" className='my_profile3' />
                                </div>
                            ))
                        ) : (
                            <div className='my_proo19'>
                                <img src={nostory} alt="" className='my_proo0' /><br />
                            </div>
                        )}
                    </div>
                </div>
                <div className='d-flex'>
                    <h5><Grid3x3 /></h5>
                    <h5 className='mmm'>posts</h5>
                </div>
                        
                <div className='mmee row'>
                    {post.length > 0 ? (
                        post.map((item) => (
                            <div className='col-4' key={item.id}>
                                <img src={item.add_post} alt="" className='my_post' />
                            </div>
                        ))
                    ) : (
                        <div className='my_proo1'>
                            <img src={notyet} alt="" className='my_proo' /><br />
                            <span className='my_proo2'>Not Yet Post</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
