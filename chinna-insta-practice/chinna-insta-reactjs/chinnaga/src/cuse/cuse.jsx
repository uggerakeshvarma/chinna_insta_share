import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import no from '../Assists/images/buetful grass.png';
import './cuse.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import { CaretRightFill, CaretLeftFill } from 'react-bootstrap-icons';
import axios from 'axios';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray", right: "10px" }}
      onClick={onClick}
    >
      <CaretRightFill />
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray", left: "10px" }}
      onClick={onClick}
    >
      <CaretLeftFill />
    </div>
  );
}

export function Cuse() {
  const [cuse, setCuse] = useState([]);

  useEffect(() => {
    cuseData();
  }, []);

  async function cuseData() {
    const res = await axios.get("http://localhost:4008/top");
    setCuse(res.data);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    rows: 1, // Ensure only 1 row of images
  };

  return (

    <Slider {...settings }  className='mss'> 
  
         <div className='case  col-3  d-flex ms-5  m-3'>
        <div></div>
        <h3><img src={no} alt="" /></h3>
      
      <div>
        <h3><img src={no} alt="" /></h3>
      </div>
      <div>
        <h3><img src={no} alt="" /></h3>
      </div>
      <div>
        <h3><img src={no} alt="" /></h3>
      </div>    
        </div>

      <div className='case   d-flex  ms-5  m-3 p-3'>
      <div>
        <h3><img src={no} alt="" /></h3>
      </div>
      
     
      <div>
        <h3><img src={no} alt="" /></h3>
      </div>
      </div>
       
      </Slider>
    
  );
}
