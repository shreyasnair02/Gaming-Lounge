import React from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function CommentsList({ comments }) {
  console.log("commentList", comments);
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

// state: dislike-> false | liked-> false
// click: like-> incr
// state: dislike-> false | liked-> true
// click: likes-> decr
// state: dislike-> false | liked-> false
// click: likes-> decr
// state: dislike-> true | liked-> false
// click: likes-> incr

//likes: 0
//dislikes: 1
