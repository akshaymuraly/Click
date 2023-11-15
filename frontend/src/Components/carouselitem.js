import React from "react";
import "../CSS/carousel.css";

export const CarouselItem = ({ item, width, index }) => {
  return (
    <div key={index} className="carousel-item" style={{ width: width }}>
      <div></div>
      {/* <img className="carousel-img" src={item.icon.default} /> */}
      <div key={index} className="carousel-item-text">
        {item.description}
      </div>
    </div>
  );
};
