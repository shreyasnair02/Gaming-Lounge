import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Card from "../Card";

const responsive = {
  0: { items: 3 },
  568: { items: 2 },
  1024: { items: 4 },
};

// const items = [
//   <div className="item bg-slate-600 h-60 mx-3" data-value="1">
//     1
//   </div>,
//   <div className="item bg-slate-600 h-60 mx-3" data-value="2">
//     2
//   </div>,
//   <div className="item bg-slate-600 h-60 mx-3" data-value="3">
//     3
//   </div>,
//   <div className="item bg-slate-600 h-60 mx-3" data-value="4">
//     4
//   </div>,
//   <div className="item bg-slate-600 h-60 mx-3" data-value="5">
//     5
//   </div>,
// ];

const renderPrevButton = ({ isDisabled }) => {
  return (
    <div
      style={{ opacity: isDisabled ? "0.5" : 1 }}
      className="absolute left-0 top-1/3  backdrop-blur-sm backdrop-saturate-100 bg-[rgba(160, 164, 173, 0.05)] rounded-md"
    >
      <AiOutlineLeft size={40} className="fill-slate-300" />
    </div>
  );
};
const renderNextButton = ({ isDisabled }) => {
  return (
    <div
      style={{ opacity: isDisabled ? "0.5" : 1 }}
      className="absolute right-0 top-1/3  backdrop-blur-sm backdrop-saturate-100 bg-[rgba(160, 164, 173, 0.05)] rounded-md"
    >
      <AiOutlineRight size={40} className="fill-slate-300" />
    </div>
  );
};
const SliderCarousel = ({ arrayItems }) => {
  const items = arrayItems.map((item) => <Card dt={item}></Card>);

  return (
    <AliceCarousel
      // mouseTracking
      items={items}
      responsive={responsive}
      controlsStrategy="alternate"
      // autoPlay={true}
      infinite={true}
      disableDotsControls
      // disableSlideInfo
      autoHeight
      autoWidth
      renderNextButton={renderNextButton}
      renderPrevButton={renderPrevButton}
      touchTracking
    />
  );
};
export default SliderCarousel;
