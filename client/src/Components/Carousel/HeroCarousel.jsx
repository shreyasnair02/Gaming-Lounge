import React from "react";
import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";
import { NavLink } from "react-router-dom";
import {
  BsChevronDoubleRight,
  BsChevronDoubleLeft,
  BsXbox,
  BsPlaystation,
  BsWindows,
} from "react-icons/bs";

export default function HeroCarousel(props) {
  const ref = React.useRef();
  return (
    <div style={{ width: "100%", position: "relative" }}>
      <ResponsiveContainer
        carouselRef={ref}
        render={(parentWidth, carouselRef) => {
          // If you want to use a ref to call the method of StackedCarousel, you cannot set the ref directly on the carousel component
          // This is because ResponsiveContainer will not render the carousel before its parent's width is determined
          // parentWidth is determined after your parent component mounts. Thus if you set the ref directly it will not work since the carousel is not rendered
          // Thus you need to pass your ref object to the ResponsiveContainer as the carouselRef prop and in your render function you will receive this ref object
          let currentVisibleSlide = 5;
          if (parentWidth <= 1440) currentVisibleSlide = 3;
          if (parentWidth <= 1080) currentVisibleSlide = 1;
          return (
            <StackedCarousel
              ref={carouselRef}
              slideComponent={Card}
              slideWidth={parentWidth < 800 ? parentWidth - 40 : 750}
              carouselWidth={parentWidth}
              data={props.arr}
              currentVisibleSlide={currentVisibleSlide}
              maxVisibleSlide={5}
              // useGrabCursor
            />
          );
        }}
      />
      <>
        <div
          className="group absolute h-full w-7 lg:w-10 top-0 left-5 lg:left-28 z-10 backdrop-blur-sm backdrop-saturate-100 bg-[rgba(160, 164, 173, 0.05)]"
          onClick={() => {
            ref.current?.goBack();
          }}
        >
          <BsChevronDoubleLeft className="h-6 w-6 lg:h-12 lg:w-12 group-hover:animate-pulse absolute top-[40%] left-0 z-10" />
        </div>
        <div
          className="group absolute h-full w-7 lg:w-10 top-0 right-5 lg:right-28 z-10 backdrop-blur-sm backdrop-saturate-100 bg-[rgba(160, 164, 173, 0.05)]"
          onClick={() => {
            ref.current?.goNext(6);
          }}
        >
          <BsChevronDoubleRight className="h-6 w-6 lg:h-12 lg:w-12 group-hover:animate-pulse absolute top-[40%] right-0 z-10" />
        </div>
      </>
    </div>
  );
}

const platformIcon = (platform) => {
  const name = platform.platform.name.toLowerCase();
  const id = platform.platform.id;
  switch (name) {
    case "playstation":
      return <BsPlaystation key={id} />;
      break;
    case "pc":
      return <BsWindows key={id} />;
      break;
    case "xbox":
      return <BsXbox key={id} />;
      break;
    default:
      break;
  }
};
export const Card = React.memo(function (props) {
  const { data, dataIndex } = props;
  const { cover, title, id, platforms } = data[dataIndex];

  return (
    <div
      style={{
        width: "100%",
        height: 400,
        userSelect: "none",
      }}
      className="my-slide-component relative "
    >
      <div className="absolute bottom-0 left-0 right-0 py-3 px-10 lg:px-3 drop-shadow-2xl lola ">
        <div className="flex justify-between items-center">
          <div className="max-w-[60%]">
            <span className="text-sm flex gap-1">
              {platforms.map(platformIcon)}
            </span>
            <div>
              <h1 className="text-2xl">{title}</h1>
            </div>
          </div>
          <NavLink to={"/"}>
            <button className="btn btn-ghost">View</button>
          </NavLink>
        </div>
      </div>

      <img
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          borderRadius: 0,
        }}
        draggable={false}
        src={cover}
      />
    </div>
  );
});
