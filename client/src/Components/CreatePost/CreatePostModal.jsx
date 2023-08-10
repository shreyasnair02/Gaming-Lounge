import React from "react";
import ReactDOM from "react-dom";
import { RiCloseFill } from "react-icons/ri";
import { useMakePost } from "../../hooks/apiQueries/api-queries";
function CreatePostModal({
  handleModalOpen,
  setTags,
  setPostFlair,
  setPostTitle,
  setPostContent,
  tags,
  postFlair,
  postContent,
  postTitle,
  user_id,
}) {
  const makePost = useMakePost();
  const handleAddTag = (e) => {
    e.preventDefault();
    if (postFlair) {
      setTags([...tags, postFlair]);
      setPostFlair("");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    makePost
      .mutateAsync({ user_id, tags, postContent, postTitle })
      .then((data) => {
        handleModalOpen(false);
      });
    setTags([]);
    setPostFlair("");
    setPostTitle("");
    setPostContent("");
  };

  return ReactDOM.createPortal(
    <>
      <dialog id="my_modal_2" className="modal">
        <div method="" className="modal-box min-h-full font-orbitron">
          <form
            onSubmit={handleSubmit}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          >
            <div className=" p-4 rounded-lg shadow-lg max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-normal">Create a Post</h2>
                <button
                  className="btn btn-ghost btn-square"
                  onClick={() => handleModalOpen(false)}
                >
                  <RiCloseFill className="text-slate-100 text-2xl" />
                </button>
              </div>
              <div className="mb-4">
                <label htmlFor="postTitle" className="block font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="postTitle"
                  className="w-full border rounded px-3 py-2"
                  value={postTitle}
                  autoFocus
                  required
                  onChange={(e) => setPostTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="postContent" className="block font-medium mb-2">
                  Content
                </label>
                <textarea
                  id="postContent"
                  className="w-full border rounded px-3 py-2"
                  rows="4"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="postFlair" className="block  font-medium mb-2">
                  Flair
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    id="postFlair"
                    className="w-full border rounded-l px-3 py-2"
                    value={postFlair}
                    onChange={(e) => setPostFlair(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTag(e)}
                  />
                  <button
                    onClick={handleAddTag}
                    type="button"
                    className="btn btn-info px-3 py-1 rounded-r"
                  >
                    Add Tag
                  </button>
                </div>
                <div className="flex items-center flex-wrap mt-2 p-2 bg-neutral rounded-lg ">
                  {tags.map((tag) => (
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      key={tag}
                      className="inline-flex items-center  mr-2 btn btn-ghost btn-sm"
                    >
                      <span className="px-2 py-1">{tag}</span>
                      <RiCloseFill size={25} className="" />
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full btn btn-info">
                Create Post
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>,
    document.getElementById("post")
  );
}

export default CreatePostModal;
