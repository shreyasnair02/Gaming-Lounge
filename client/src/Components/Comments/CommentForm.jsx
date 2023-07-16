import React, { useState } from "react";

export function CommentForm({
  loading,
  error,
  onSubmit,
  autoFocus = false,
  initialValue = "",
  post_id,
  parentComment_id,
  setIsReplying,
  _id,
  setIsEditing
}) {
  const [message, setMessage] = useState(initialValue);
  function handleSubmit(e) {
    e.preventDefault();
    if (message.trim() == "") return;
    onSubmit({
      _id,
      comment_body: message,
      post_id,
      user_id: "64b1c507b16825299de09390",
      parentComment_id: parentComment_id || null,
    });
    if (!error) setMessage("");
    if(setIsReplying)setIsReplying(false)
    if(setIsEditing)setIsEditing(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2 items-center ">
        <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow bg-slate-800 resize-none h-20 rounded-lg p-2 focus:border border-slate-400 focus:outline-none focus:border-slate-500"
        />
        <button className="btn btn-ghost" type="submit" disabled={loading}>
          {loading ? (
            <span className="loading loading-spinner loading-md" />
          ) : (
            "Post"
          )}
        </button>
      </div>
      <div className="text-red-500">{error ?? "error"}</div>
    </form>
  );
}

export default CommentForm;
