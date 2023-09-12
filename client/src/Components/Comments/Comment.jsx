import React, { useState } from "react";
import IconBtn from "../Buttons/IconBtn";
import {
  BiUpvote,
  BiDownvote,
  BiReplyAll,
  BiEdit,
  BiTrashAlt,
  BiSolidUpvote,
  BiSolidDownvote,
} from "react-icons/bi";
import { FaReply } from "react-icons/fa";
import { usePost } from "../../Contexts/PostsContext";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";
import {
  useMakeComment,
  useEditComment,
  useLikeComment,
  useDeleteComment,
} from "../../hooks/apiQueries/api-queries";
import { useLogin } from "../../Contexts/LoginContext";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
  timeStyle: "short",
});
export function checkImpression(_id, user_id, media) {
  switch (media) {
    case "comment":
      if (
        user_id.commentImpressions == null ||
        user_id.commentImpressions.length <= 0
      )
        return false;
      const impressionArr = user_id?.commentImpressions?.filter(
        (item) => item.comment_id._id === _id
      );
      if (impressionArr.length > 0) {
        return impressionArr[0].impression;
      }
      break;
    case "post":
      if (
        user_id.postImpressions == null ||
        user_id.postImpressions.length <= 0
      )
        return false;
      const impressionArr2 = user_id?.postImpressions?.filter(
        (item) => item.post_id === _id
      );
      if (impressionArr2.length > 0) {
        return impressionArr2[0].impression;
      }
      break;
    default:
      return false;
  }
}
function Comment({
  _id,
  post_id,
  comment_body,
  createdOn,
  likes,
  dislikes,
  parentComment_id,
  user_id,
}) {
  const { getReplies, getParentId } = usePost();
  const { isLoggedIn, user } = useLogin();
  const childComments = getReplies(_id);
  const [isChildrenHidden, setChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLiked, setIsLiked] = useState(() => {
    if (!isLoggedIn) return false;
    const result = checkImpression(_id, user, "comment");
    return result === "like";
  });
  const [isDisliked, setIsDisliked] = useState(() => {
    if (!isLoggedIn) return false;
    console.log(_id, user, "comment");
    const result = checkImpression(_id, user, "comment");
    return result === "dislike";
  });
  const newCommentMutation = useMakeComment({
    post_id,
    toInvalidate: ["posts", `${post_id}`],
  });
  const newCommentEditMutation = useEditComment({
    post_id,
    toInvalidate: ["posts", `${post_id}`],
  });
  const newCommentLikeMutation = useLikeComment({
    post_id,
    toInvalidate: ["posts", `${post_id}`],
  });

  const newCommentDeleteMutation = useDeleteComment({
    post_id,
    toInvalidate: ["posts", `${post_id}`],
  });
  const isOp = (id1, id2) => {
    if (id1 === id2) return true;
    return false;
  };

  return (
    <>
      <div className="card border border-gray-700  ">
        <div className="flex gap-4 justify-between px-4 py-2">
          <div className="flex items-center mb-2">
            <img
              src={user_id.avatar_url}
              alt={`${user_id.name}'s avatar`}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-gray-500 text-sm hover:underline cursor-default">
              {user_id.name}
            </span>
            <span className="mx-2 text-gray-500">•</span>
            <span className="text-gray-500 text-sm">
              {new Date(createdOn).toDateString()}
            </span>
          </div>
        </div>
        <div className="card-body px-4 py-3">
          {isEditing ? (
            <CommentForm
              autoFocus
              initialValue={comment_body}
              onSubmit={newCommentEditMutation.mutate}
              _id={_id}
              setIsEditing={setIsEditing}
              loading={newCommentEditMutation.isLoading}
              error={newCommentEditMutation.error}
            />
          ) : (
            <p className="text-gray-300 mt-1 mb-2">{comment_body}</p>
          )}
          <div className="join-horizontal flex items-center">
            <IconBtn
              onClick={() => {
                if (!isLoggedIn) {
                  window.my_modal_1.showModal();
                  return;
                }
                newCommentLikeMutation.mutate({
                  user_id: user,
                  post_id,
                  action: isDisliked
                    ? "undislikeandlike"
                    : isLiked
                    ? "unlike"
                    : "like",
                  _id,
                });
                setIsDisliked(false);
                setIsLiked((prev) => !prev);
              }}
              Icon={isLiked ? BiSolidUpvote : BiUpvote}
              color={"text-white"}
              aria-label="like"
              isActive={!newCommentLikeMutation.isLoading}
            />
            <span className="text-sm">
              {newCommentLikeMutation.isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                likes - dislikes
              )}
            </span>
            <IconBtn
              onClick={() => {
                if (!isLoggedIn) {
                  window.my_modal_1.showModal();
                  return;
                }
                newCommentLikeMutation.mutate({
                  user_id: user,
                  post_id,
                  action: isLiked
                    ? "unlikeanddislike"
                    : isDisliked
                    ? "undislike"
                    : "dislike",
                  _id,
                });
                setIsLiked(false);
                setIsDisliked((prev) => !prev);
              }}
              Icon={isDisliked ? BiSolidDownvote : BiDownvote}
              color={"text-white"}
              aria-label="like"
              isActive
            />
            <IconBtn
              onClick={() => {
                if (!isLoggedIn) {
                  window.my_modal_1.showModal();
                  return;
                }
                setIsReplying((prev) => !prev);
              }}
              Icon={FaReply}
              color={"text-white"}
              // isActive={isReplying}
              isActive
              aria-label={isReplying ? "Cancel Reply" : "Reply"}
            />
            {isLoggedIn && isOp(user._id, user_id._id) && (
              <IconBtn
                onClick={() => setIsEditing((prev) => !prev)}
                Icon={BiEdit}
                color={"text-white"}
                aria-label="edit"
                isActive
              />
            )}
            {isLoggedIn && isOp(user._id, user_id._id) && (
              <IconBtn
                onClick={() =>
                  newCommentDeleteMutation.mutate({
                    post_id,
                    _id,
                    user_id,
                    parentComment_id,
                  })
                }
                Icon={BiTrashAlt}
                color={"text-red-600"}
                aria-label="delete"
                isActive
                isDeleteIcon
              />
            )}
          </div>
        </div>
      </div>
      {isReplying && (
        <div className="mt-1 ml-3">
          <CommentForm
            autoFocus
            parentComment_id={_id}
            post_id={post_id}
            onSubmit={newCommentMutation.mutate}
            setIsReplying={setIsReplying}
            // loading={createCommentFn.loading}
            // error={createCommentFn.error}
          />
        </div>
      )}
      {childComments?.length > 0 && (
        <>
          <div className={`flex ${isChildrenHidden ? "hidden" : ""}`}>
            <button
              aria-label="hide replies"
              className="collapse-line "
              onClick={() => setChildrenHidden(true)}
            />
            <div className="pl-2 flex-grow">
              <CommentsList comments={childComments} />
            </div>
          </div>
          <button
            className={`btn-link mt-1  ${!isChildrenHidden ? "hidden" : ""}`}
            onClick={() => setChildrenHidden(false)}
          >
            Read More
          </button>
        </>
      )}
    </>
  );
}

export default Comment;
