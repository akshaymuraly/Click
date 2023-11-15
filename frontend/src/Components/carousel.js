import "../CSS/carousel.css";
import React, { useState } from "react";
import { CarouselItem } from "./carouselitem";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BiRadioCircleMarked } from "react-icons/bi";
export const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      title: "Baseball",
      description:
        "Baseball is a bat-and-ball sport played between two teams of nine players each, taking turns batting and fielding. The game occurs over the course of several plays, with each play generally beginning when a player on the fielding team, called the pitcher.",
    },
    {
      title: "Walking",
      description:
        "Walking (also known as ambulation) is one of the main gaits of terrestrial locomotion among legged animals. Walking is typically slower than running and other gaits. ",
    },
    {
      title: "Weights",
      description:
        "Weightlifting generally refers to activities in which people lift weights, often in the form of dumbbells or barbells. People lift various kinds of weights for a variety of different reasons.",
    },
  ];
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }

    setActiveIndex(newIndex);
  };
  return (
    <div className="carousel">
      <div
        className="inner"
        style={{ transform: `translate(-${activeIndex * 100}%)` }}
      >
        {items.map((item, index) => {
          return (
            <CarouselItem
              key={index}
              item={item}
              index={index}
              width={"100%"}
            />
          );
        })}
      </div>

      <div className="carousel-buttons">
        <button
          className="lp-button"
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          <BsChevronLeft />
        </button>
        <div className="indicators">
          {items.map((item, index) => {
            return (
              <button
                key={index}
                className="indicator-buttons"
                onClick={() => {
                  updateIndex(index);
                }}
              >
                <span
                  key={index}
                  className={`material-symbols-outlined ${
                    index === activeIndex
                      ? "indicator-symbol-active"
                      : "indicator-symbol"
                  }`}
                >
                  <BiRadioCircleMarked />
                </span>
              </button>
            );
          })}
        </div>
        <button
          className="lp-button"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          <BsChevronRight />
        </button>
      </div>
    </div>
  );
};
