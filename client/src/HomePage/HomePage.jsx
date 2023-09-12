import React from "react";
import PageWrapper from "../utils/PageWrapper";
import Line1 from "../assets/Line1";
import Line2 from "../assets/Line2";
import { NavLink } from "react-router-dom";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { BsChevronDoubleRight } from "react-icons/bs";
import { BiChevronsRight } from "react-icons/bi";
import heroImage from "../assets/big_hero_copy_copy.png";
const HomePage = () => {
  return (
    <PageWrapper classes={"lg:px-0 px-0 lg:pb-0"}>
      <div className="hero lg:pt-16 min-h-full overflow-hidden">
        <div className="hero-content flex-col-reverse lg:flex-row min-w-full p-0 justify-between gap-0 lg:gap-4 items-start">
          <div className="flex justify-center min-w-[75%] items-center flex-col">
            <div className=" mx-8 lg:m-10 min-w-[75%]">
              <h1 className="text-2xl lg:text-5xl font-normal block lg:space-y-2">
                <span className="block text-primary ">GAME.</span>
                <span className="block">CONNECT.</span>
                <span className="block">CONQUER.</span>
              </h1>
              <p className="py-3 lg:py-6 lg:max-w-md">
                Welcome to Gaming Lounge, your portal to a gaming experience
                like no other.
              </p>
              <div className="flex gap-5 items-center">
                <NavLink
                  className="btn btn-sm btn-secondary lg:btn lg:btn-secondary shadow-2xl  rounded-3xl"
                  to={"/games"}
                >
                  Get Started
                </NavLink>
                <NavLink
                  className="link hover:text-cyan-400 transition-all ease"
                  to={"/forum"}
                >
                  <span className="flex items-center text-xl ">
                    Visit Hive
                    <AiOutlineRight
                      color="cyan"
                      size={25}
                      className="animate-pulse"
                    />
                    <AiOutlineRight
                      color="cyan"
                      className="animate-pulse relative left-[-14px]"
                      size={25}
                    />
                    <AiOutlineRight
                      color="cyan"
                      className="animate-pulse relative left-[-28px]"
                      size={25}
                    />
                    {/* <BiChevronsRight
                      color="cyan"
                      size={40}
                      className="animate-pulse"
                    /> 
                    <BsChevronDoubleRight
                      color="cyan"
                      size={25}
                      className="animate-pulse cubic"
                    />
                     <BsChevronDoubleRight
                      color="cyan"
                      size={25}
                      className="animate-pulse relative left-[-10px]"
                    /> */}
                  </span>
                </NavLink>
              </div>
            </div>
            <div className="mr-auto flex flex-col lg:gap-10 py-3">
              <Line1
                classes={" lg:h-[30px] lg:w-[668px] h-[30px] w-[300px] "}
              />
              <Line2 classes={" lg:h-[6px] lg:w-[556px] h-[30px] w-[250px] "} />
            </div>
          </div>
          <div className="w-full h-[50vh]  ">
            <img
              src={heroImage}
              alt=""
              className="absolute top-1 lg:bottom-0 -right-1/4  lg:right-0 lg:w-[40%] lg:h-[90vh] h-[50vh] rounded-tl-[60%] shadow-[-9px_0px_6px_3px_#0f1626] "
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
