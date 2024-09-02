import './image_bind.css';
import logo from '../Assists/images/logo.png';
import no from '../Assists/images/th (5).jpg';
import noiamge from '../Assists/images/bo photo.jpg';
import { Chat, Heart, HeartFill, ShareFill } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import store from '../JS_FILES/Reduc.Stores';
import { getview } from '../JS_FILES/insta_account';
import notfound from '../Assists/images/Group (2).png';
import { WhatsappIcon } from 'react-share';

export function Image_Bind() {
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const toggleLike = () => {
        setLike(!like);
        if (like) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
    }

    const [Search, setSearch] = useState([]);

    useEffect(() => {
        const fetchPicture = async () => {
            try {
                const res = await getview();
                console.log('Fetched data:', res.data);
                setSearch(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPicture();

        const unsubscribe = store.subscribe(() => {
            setSearch(store.getState()?.products);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const whatsappNumber = '1234567890'; // replace with your target number

    return (
        <>
            {Search.length > 0 ? (
                Search.map((item) => (
                    <div className='font-head1' key={item.id}>
                        <div className='font4'>
                            <div>
                                {item.user_image ? (
                                    <a href={`/Other_profile/${item.user_id}`}>
                                        <img src={item.user_image} alt="User" className='font-2' />
                                    </a>
                                ) : (
                                    <img src={noiamge} alt="Default" className='font-2' />
                                )}
                                <span className='font-22 ms-3'>{item.UserName}</span>
                            </div>
                        </div>
                        <div>
                            {item.add_post ? (
                                <img src={item.add_post} alt="Post" className='font3' />
                            ) : (
                                <img src={noiamge} alt="Not Found" className='font3' />
                            )}
                        </div>
                        <div>
                            <span className='font5' onClick={toggleLike}>
                                {like ? (
                                    <HeartFill className="like_icon like" />
                                ) : (
                                    <Heart className="like_icon" />
                                )}
                            </span>
                            <span className='font5'><Chat /></span>
                            <span className='font5'>
                                <a
                                    href={`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=Check out this post by ${item.UserName}: ${item.add_post}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <WhatsappIcon size={32} round />
                                </a>
                            </span>
                        </div>
                        <div className='font7'>
                            <span className='font66'>{likeCount} Likes</span>
                            <p className='font6'>{item.caption}</p>
                        </div>
                        <br />
                    </div>
                ))
            ) : (
                <div className='no-results1'>
                    <img src={notfound} alt="No Results" className='frontt' />
                    <h4 className='frontt1'>No Search Results</h4>
                    <p className='frontt2'>Try different keyword or search again</p>
                </div>
            )}
        </>
    );
}
