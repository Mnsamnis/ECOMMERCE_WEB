import React from "react";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const HomeSectionCarousel = ({ data , sectionName}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const items = data
    .slice(0, 16)
    .map((item) => <HomeSectionCard product={item} />);

  return (
    <div className="">
      <h2 className="text-2xl font-extrabold text-grey-800 py-5">{sectionName}</h2>
      <div className="relative p-5">
        <Slider {...settings}>{items}</Slider>
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
