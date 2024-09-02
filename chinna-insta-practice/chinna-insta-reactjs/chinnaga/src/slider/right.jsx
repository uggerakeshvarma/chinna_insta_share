import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';
import Slider from "react-slick";

function ArrowRight(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, color: "black", fontSize: "1.5rem", zIndex: 1 }}
            onClick={onClick}
        >
            <CaretRightFill />
        </div>
    );
}

function ArrowLeft(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, color: "black", fontSize: "1.5rem", zIndex: 1 }}
            onClick={onClick}
        >
            <CaretLeftFill />
        </div>
    );
}

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
    ],
};
