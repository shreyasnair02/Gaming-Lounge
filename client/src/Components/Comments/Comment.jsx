import React, { useState } from "react";
import IconBtn from "../Buttons/IconBtn";
import { BiUpvote, BiReplyAll, BiEdit, BiTrashAlt } from "react-icons/bi";
import { FaReply } from "react-icons/fa";
import { usePost } from "../../Contexts/PostsContext";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";
import {
  useMakeComment,
  useEditComment,
  useLikeComment,
  useDeleteComment
} from "../../hooks/apiQueries/api-queries";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});
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
  const childComments = getReplies(_id);
  const [isChildrenHidden, setChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

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
  const newCommentDeleteMutation=useDeleteComment({
    post_id,
    toInvalidate:['posts',`${post_id}`]
  })
  return (
    <>
      <div className="card border border-white  ">
        <div className="flex gap-4 justify-between px-4 py-2">
          <div>{user_id.name}</div>
          <div>{dateFormatter.format(Date.parse(createdOn))}</div>
        </div>
        <div className="card-body px-4 py-3">
          {/* <p>{_id}</p> */}
          {/* {console.log(getParentId(_id))} */}
          <p>{getParentId(_id)}</p>
          {isEditing ? (
            <CommentForm
              autoFocus
              initialValue={comment_body}
              onSubmit={newCommentEditMutation.mutate}
              _id={_id}
              setIsEditing={setIsEditing}
              // loading={updateCommentFn.loading}
              // error={updateCommentFn.error}
            />
          ) : (
            <p>{comment_body}</p>
          )}

          <div className="join-horizontal">
            <IconBtn
              onClick={() => {
                newCommentLikeMutation.mutate({
                  user_id,
                  post_id,
                  action: isLiked ? "unlike" : "like",
                  _id,
                });
                setIsLiked((prev) => !prev);
              }}
              Icon={BiUpvote}
              color={"text-white"}
              aria-label="like"
              isActive
            >
              {likes}
            </IconBtn>
            <IconBtn
              onClick={() => setIsReplying((prev) => !prev)}
              Icon={FaReply}
              color={"text-white"}
              // isActive={isReplying}
              isActive
              aria-label={isReplying ? "Cancel Reply" : "Reply"}
            />
            <IconBtn
              onClick={() => setIsEditing((prev) => !prev)}
              Icon={BiEdit}
              color={"text-white"}
              aria-label="edit"
              isActive
            />
            <IconBtn
              onClick={()=>newCommentDeleteMutation.mutate({post_id,_id,user_id,parentComment_id})}
              Icon={BiTrashAlt}
              color={"text-red-600"}
              aria-label="delete"
              isActive
            />
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
              className="collapse-line"
              onClick={() => setChildrenHidden(true)}
            />
            <div className="pl-2 flex-grow">
              <CommentsList comments={childComments} />
            </div>
          </div>
          <button
            className={`btn-link mt-1 ${!isChildrenHidden ? "hidden" : ""}`}
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
