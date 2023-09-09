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
      <div className="flex gap-2 items-stretch justify-center">
        {isLoggedIn ? (
          <>
            <div className="flex items-start">
              <img src={user.avatar_url} className="avatar h-12 rounded-full" />
            </div>
            <div className="bg-blue-950 w-full flex border-1 rounded-lg border textarea textarea-bordered ">
              <textarea
                autoFocus={autoFocus}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow bg-blue-950  resize-none h-32 rounded-lg p-2 focus:baorder border-slate-400 focus:outline-none focus:border-slate-500  "
              />
              <button
                className="btn btn-ghost h-auto  "
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
          </>
        ) : (
          <div className=" text-slate-300">
            {" "}
            Please{" "}
            <button
              onClick={() => window.my_modal_1.showModal()}
              className="underline decoration-sky-500 hover:text-white transition-all"
            >
              {" "}
              sign-in
            </button>{" "}
            to leave a comment.
          </div>
        )}
      </div>

      {error && console.log(error)}
      <div className="text-red-500">{error && "error"}</div>
    </form>
  );
}

export default CommentForm;
