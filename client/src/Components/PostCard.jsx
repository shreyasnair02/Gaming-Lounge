import React, { useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { PiEye } from "react-icons/pi";
import { useLikePost } from "../hooks/apiQueries/api-queries";
import {
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
  BiSolidDownvote,
} from "react-icons/bi";
import { checkImpression } from "./Comments/Comment";
import IconBtn from "./Buttons/IconBtn";
import { useLogin } from "../Contexts/LoginContext";
const PostCard = ({ post }) => {
  const {
    title,
    body,
    user_id,
    likes,
    dislikes,
    tags,
    createdOn,
    comment_ids,
    _id,
    views,
  } = post;
  const { isLoggedIn, user } = useLogin();
  const [isLiked, setIsLiked] = useState(() => {
    if (!isLoggedIn) return false;
    const result = checkImpression(_id, user, "post");
    return result === "like";
  });
  const [isDisliked, setIsDisliked] = useState(() => {
    if (!isLoggedIn) return false;
    const result = checkImpression(_id, user, "post");
    return result === "dislike";
  });
  const newPostLike = useLikePost({
    toInvalidate: ["posts"],
  });

  return (

    <div className="bg-gray-900 p-4 rounded-md border border-gray-700 shadow-md mb-4 text-white flex">
      <div className="flex flex-col items-center text-sm mr-2">
        <IconBtn
          onClick={(e) => {
            // e.stopPropagation();
            e.preventDefault();

            if (!isLoggedIn) {
              window.my_modal_1.showModal();
              return;
            }
            newPostLike.mutate({
              user_id: user,
              post_id: _id,
              action: isDisliked
                ? "undislikeandlike"
                : isLiked
                ? "unlike"
                : "like",
            });
            setIsDisliked(false);
            setIsLiked((prev) => !prev);
          }}
          area-label="like"
          Icon={isLiked ? BiSolidUpvote : BiUpvote}
          isActive
        />

        <span className="text-sm">{likes - dislikes}</span>
        <IconBtn
          area-label="like"
          onClick={(e) => {
            e.preventDefault();
            if (!isLoggedIn) {
              window.my_modal_1.showModal();
              return;
            }
            newPostLike.mutate({
              user_id: user,
              post_id: _id,
              action: isLiked
                ? "unlikeanddislike"
                : isDisliked
                ? "undislike"
                : "dislike",
            });
            setIsLiked(false);
            setIsDisliked((prev) => !prev);
          }}
          Icon={isDisliked ? BiSolidDownvote : BiDownvote}
          isActive
        />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <img
            src={user_id.avatar_url}
            alt={`${user_id.name}'s avatar`}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-gray-500 text-sm hover:underline">
            {user_id.name}
          </span>
          <span className="mx-2 text-gray-500">•</span>
          <span className="text-gray-500 text-sm">
            {new Date(createdOn).toDateString()}
          </span>
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-300 mt-2 mb-4">{body}</p>
        <div className="flex items-center text-gray-500">
          <span className="flex items-center mr-4">
            <PiEye className="mr-1" />
            {views}
          </span>
          <span className="flex items-center">
            <FaRegCommentAlt className="mr-1" />
            {comment_ids.length}
          </span>
        </div>
        <div className="mt-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="mr-2 bg-gray-700 px-2 py-1 rounded-lg text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
