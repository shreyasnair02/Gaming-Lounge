import React from "react";
import IconBtn from "../../../Components/Buttons/IconBtn";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { PiEye } from "react-icons/pi";
import { FaRegCommentAlt } from "react-icons/fa";
import PageWrapper from "../../../utils/PageWrapper";

function PostCardSkeleton() {
  return (
    <div className=" p-4 rounded-md border border-gray-700 shadow-md mb-4 text-white flex">
      <div className="flex flex-col items-center text-sm mr-2">
        <BiUpvote
          size={18}
          className="text-gray-load1 animate-pulse"
          color="gray"
        />
        <span className="h-3 w-3  animate-pulse"></span>
        <BiDownvote
          size={18}
          className=" text-gray-load1 animate-pulse"
          color="gray"
        />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 rounded-full mr-2 bg-gray-load1 animate-pulse" />
          <span className="text-gray-500 text-sm h-4 w-20 bg-gray-load1 animate-pulse rounded-s"></span>
          <span className="mx-1 text-gray-load1 animate-pulse text-3xl">•</span>
          <span className="text-gray-500 text-sm h-4 w-36 bg-gray-load1 animate-pulse rounded-s"></span>
        </div>
        <h2 className="text-xl font-semibold h-6 lg:h-8 w-full lg:w-[56rem] bg-gray-load1 animate-pulse rounded-s"></h2>
        <p className="text-gray-300 mt-4 mb-2  h-3 w-3/4 bg-gray-load1 animate-pulse rounded-s"></p>
        <p className="text-gray-300 mt-1 mb-2  h-3 w-3/4 bg-gray-load1 animate-pulse rounded-s"></p>
        <p className="text-gray-300 mt-1 mb-2  h-3 w-2/4 bg-gray-load1 animate-pulse rounded-s"></p>
        <div className="flex items-center text-gray-500">
          <span className="flex items-center mr-4 ">
            <PiEye className="mr-1 text-gray-500 animate-pulse" size={19} />
            <span className="h-2 w-4 bg-gray-load1 animate-pulse rounded-s"></span>
          </span>
          <span className="flex items-center">
            <FaRegCommentAlt
              className="mr-1  text-gray-600 animate-pulse"
              size={18}
            />
            <span className="h-2 w-4 bg-gray-load1 animate-pulse rounded-s"></span>
          </span>
        </div>
        <div className="mt-4 flex gap-2">
          <span className="block mr-2 bg-gray-load1 px-2 py-1 rounded-lg text-sm h-6 w-16 animate-pulse"></span>
          <span className="block mr-2 bg-gray-load1 px-2 py-1 rounded-lg text-sm h-6 w-16 animate-pulse"></span>
          <span className="block mr-2 bg-gray-load1 px-2 py-1 rounded-lg text-sm h-6 w-16 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}
function ForumPageSkeleton() {
  return (
    <div className="lg:px-6 lg:py-4 py-6">
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
    </div>
  );
}

export default ForumPageSkeleton;
