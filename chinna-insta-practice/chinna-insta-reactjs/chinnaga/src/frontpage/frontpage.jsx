import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import no from '../Assists/images/flowers).png';
import './frontpage.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import { CaretRightFill, CaretLeftFill } from 'react-bootstrap-icons';
import axios from 'axios';
import { Image_Bind } from '../IMAGE_BIND/image_bind';
import { Header } from '../Header/Header';





export function Frontpage() {
  const [cuse, setCuse] = useState([]);

  useEffect(() => {
    cuseData();
  }, []);

  async function cuseData() {
    const res = await axios.get("http://localhost:4008/top");
    setCuse(res.data);
  }

 


  return (
  <> 
  <Header />
  <div className='font-head' >
      {
       cuse.map ((item) => 
     <div className='font-img'>
       <img src={item.user_image} alt="" />
       <h6>{item.UserName}</h6>
     </div>
      )
    }

   
    </div>
    <div>
        <Image_Bind />
    </div>
    </>
  );
}
