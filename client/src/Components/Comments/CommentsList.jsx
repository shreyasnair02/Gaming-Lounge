import React from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function CommentsList({ comments }) {
  return (
    <div className="">
      {comments.map((comment) => (
        <div key={comment._id} className="my-1 last:mb-0 ">
          <Comment {...comment} />
        </div>
      ))}
    </div>
  );
}

export default CommentsList;
