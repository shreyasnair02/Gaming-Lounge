import React, { useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import PageWrapper from "../../utils/PageWrapper";
// import { useParams } from "react-router-dom";
import { PiEye } from "react-icons/pi";
import {
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
  BiSolidDownvote,
} from "react-icons/bi";
import {
  useGetPosts,
  useLikePost,
  useMakeComment,
} from "../../hooks/apiQueries/api-queries";
import { usePost } from "../../Contexts/PostsContext";
import CommentsList from "../../Components/Comments/CommentsList";
import CommentForm from "../../Components/Comments/CommentForm";
import IconBtn from "../../Components/Buttons/IconBtn";
import { checkImpression } from "../../Components/Comments/Comment";
import { useLogin } from "../../Contexts/LoginContext";

function PostPage() {
  const { isLoggedIn, user } = useLogin();
  const { post, rootComments, getReplies } = usePost();
  const newCommentMutation = useMakeComment({
    post_id: post._id,
    toInvalidate: ["posts", `${post._id}`],
  });
  const [isLiked, setIsLiked] = useState(() => {
    const result = checkImpression(post._id, post.user_id, "post");
    console.log(post._id, post.user_id);
    return result == "like" ? true : false;
  });
  const [isDisliked, setIsDisliked] = useState(() => {
    const result = checkImpression(post._id, post.user_id, "post");
    console.log(post._id, post.user_id);
    return result == "dislike" ? true : false;
  });
  const newPostLike = useLikePost({
    toInvalidate: ["posts"],
  });

  return (
    <PageWrapper>
      <div className=" min-h-screen text-white">
        <div className="max-w-4xl mx-auto p-8">
          {post && (
            <div className="flex flex-col gap-8">
              <div className="flex">
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
                        user_id: post.user_id,
                        post_id: post._id,
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

                  <span className="text-sm">{post.likes - post.dislikes}</span>
                  <IconBtn
                    area-label="like"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!isLoggedIn) {
                        window.my_modal_1.showModal();
                        return;
                      }
                      newPostLike.mutate({
                        user_id: post.user_id,
                        post_id: post._id,
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
                <div className="items-center gap-4 ">
                  <img
                    src={post.user_id.avatar_url}
                    alt=""
                    srcSet=""
                    className="avatar h-20 rounded-full"
                  />

                  <div className="flex gap-2 mb-4">
                    <span className="text-gray-300">{post.user_id.name}</span>
                    <span> • </span>
                    <span className="text-gray-500">
                      {new Date(post.createdOn).toDateString()}
                    </span>
                  </div>
                  <h1 className="text-4xl font-semibold">{post.title}</h1>
                  <p className="text-gray-300 mt-2">{post.body}</p>
                  <div className="flex items-center text-gray-500 mt-4">
                    <span className="flex items-center mr-4">
                      <PiEye className="mr-1" />
                      {post.views} Views
                    </span>
                    <span className="flex items-center">
                      <FaRegCommentAlt className="mr-1" />
                      {post.comment_ids.length} Comments
                    </span>
                  </div>
                  <div className="mt-4">
                    {post.tags.map((tag, index) => (
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
              <div>
                <CommentForm
                  onSubmit={newCommentMutation.mutate}
                  loading={newCommentMutation.isLoading}
                  error={newCommentMutation.isError}
                  post_id={post._id}
                />
              </div>
              <div>
                {rootComments && <CommentsList comments={rootComments} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

export default PostPage;
