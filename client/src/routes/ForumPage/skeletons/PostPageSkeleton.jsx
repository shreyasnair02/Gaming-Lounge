import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import PageWrapper from "../../../utils/PageWrapper";
import { PiEye } from "react-icons/pi";
import { FaRegCommentAlt, FaReply } from "react-icons/fa";

function PostPageSkeleton() {
  return (
    <PageWrapper>
      <div className=" min-h-screen text-white">
        <div className="max-w-4xl mx-auto p-8">
          <div className="flex flex-col gap-2">
            <div className="flex">
              <div className="flex flex-col items-center text-sm mr-2">
                <BiUpvote size={20} className="text-gray-600 animate-pulse" />
                <span className="block text-sm h-2 w-4 "></span>
                <BiDownvote size={20} className="text-gray-600 animate-pulse" />
              </div>
              <div className="items-center gap-4 ">
                <div className="avatar h-20 w-20 rounded-full bg-gray-load1 animate-pulse" />
                <div className="flex gap-2 mb-4">
                  <span className="text-gray-300 h-6 lg:w-32 w-28 bg-gray-load1 animate-pulse rounded-s" />
                  <span className="text-gray-500 animate-pulse scale-[2]">
                    •
                  </span>
                  <span className="text-gray-500 h-6  lg:w-52 w-44 bg-gray-load1 animate-pulse rounded-s" />
                </div>
                <h1 className="text-4xl font-semibold mt-6 lg:h-11 h-7 lg:w-[45rem] w-96 bg-gray-load1 animate-pulse rounded-s" />
                <p className="text-gray-300 mt-3 lg:h-6 h-4 w-10/12 bg-gray-load1 animate-pulse rounded-s " />
                <p className="text-gray-300 mt-2 lg:h-6 h-4 w-10/12 bg-gray-load1 animate-pulse rounded-s " />
                <p className="text-gray-300 mt-2 lg:h-6 h-4 w-2/4 bg-gray-load1 animate-pulse rounded-s " />
                <div className="flex items-center text-gray-500 mt-4">
                  <span className="flex items-center mr-4 text-gray-600 animate-pulse">
                    <PiEye className="mr-1 text-gray-600 animate-pulse rounded-s" />
                    Views
                  </span>
                  <span className="flex items-center text-gray-600 animate-pulse">
                    <FaRegCommentAlt className="mr-1 text-gray-600 animate-pulse rounded-s" />
                    Comments
                  </span>
                </div>
                <div className="mt-4 flex">
                  <span className="block mr-2 bg-gray-load1 px-2 py-1 rounded-lg text-sm h-6 w-16 animate-pulse"></span>
                  <span className="block mr-2 bg-gray-load1 px-2 py-1 rounded-lg text-sm h-6 w-16 animate-pulse"></span>
                  <span className="block mr-2 bg-gray-load1 px-2 py-1 rounded-lg text-sm h-6 w-16 animate-pulse"></span>
                </div>
              </div>
            </div>
            <div>
              {/* <CommentForm
                onSubmit={newCommentMutation.mutate}
                loading={newCommentMutation.isLoading}
                error={newCommentMutation.isError}
                post_id={post._id}
              /> */}
            </div>
            <CommentSkeleton />
            <CommentSkeleton />
            <ReplySkeleton />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

function CommentSkeleton() {
  return (
    <>
      <div className="card border border-gray-700  ">
        <div className="flex gap-4 justify-between px-4 py-2">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full mr-2 bg-gray-load1 animate-pulse" />
            <span className="text-gray-500 text-sm hover:underline cursor-default h-4 w-20 bg-gray-load1 animate-pulse rounded-s "></span>
            <span className="mx-2 text-gray-500 animate-pulse">•</span>
            <span className="text-gray-500 text-sm bg-gray-load1 h-4 w-36 animate-pulse rounded-s"></span>
          </div>
        </div>
        <div className="card-body px-4 py-3">
          <p className="text-gray-300   h-3 w-11/12 bg-gray-load1 animate-pulse rounded-s"></p>
          <p className="text-gray-300  h-3 w-10/12 bg-gray-load1 animate-pulse rounded-s"></p>
          <p className="text-gray-300  h-3 w-3/4 bg-gray-load1 animate-pulse rounded-s"></p>
          <div className="join-horizontal flex items-center">
            <BiUpvote size={18} className="text-gray-load1 animate-pulse" />
            <span className="text-sm h-4 w-4"></span>
            <BiDownvote size={18} className=" text-gray-load1 animate-pulse" />
            <FaReply size={18} className="text-gray-load1 animate-pulse" />
          </div>
        </div>
      </div>
    </>
  );
}
function ReplySkeleton() {
  return (
    <>
      <div className="flex">
        <button className="collapse-line1  bg-green-800 " />
        <div className="pl-2 flex-grow">
          <CommentSkeleton />
        </div>
      </div>
      <button className={`btn-link mt-1`}></button>
    </>
  );
}
export default PostPageSkeleton;
