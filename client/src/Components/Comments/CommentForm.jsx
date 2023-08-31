import React, { useState } from "react";
import { useLogin } from "../../Contexts/LoginContext";

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
  setIsEditing,
}) {
  const { isLoggedIn, user, setLoginData } = useLogin();
  const [message, setMessage] = useState(initialValue);
  function handleSubmit(e) {
    e.preventDefault();
    if (!isLoggedIn) {
      window.my_modal_1.showModal();
      return;
    }
    if (message.trim() == "") return;
    onSubmit({
      _id,
      comment_body: message,
      post_id,
      user_id: user,
      parentComment_id: parentComment_id || null,
    });
    if (!error) setMessage("");
    if (setIsReplying) setIsReplying(false);
    if (setIsEditing) setIsEditing(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2 items-stretch ">
        <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow bg-slate-800 resize-none h-20 rounded-lg p-2 focus:border border-slate-400 focus:outline-none focus:border-slate-500"
        />
        <button
          className="btn btn-ghost h-auto"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-md" />
          ) : (
            "Post"
          )}
        </button>
      </div>
      {error ?? console.log(error)}
      <div className="text-red-500">{error && "error"}</div>
    </form>
  );
}

export default CommentForm;
