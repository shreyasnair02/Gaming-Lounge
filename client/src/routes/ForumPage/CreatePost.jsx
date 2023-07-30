import React, { useState } from "react";
import CreatePostModal from "../../Components/CreatePost/CreatePostModal";
import { AiOutlinePlus } from "react-icons/ai";
import { useLogin } from "../../Contexts/LoginContext";
function CreatePost({ user_id }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postFlair, setPostFlair] = useState("");
  const [tags, setTags] = useState([]);
  const handleModalOpen = (state) => {
    if (state) {
      window.my_modal_2.showModal();
    } else {
      window.my_modal_2.close();
    }
    setModalIsOpen(true);
  };
  return (
    <div>
      <button onClick={() => handleModalOpen(true)} className="btn btn-square">
        <AiOutlinePlus />
      </button>
      <CreatePostModal
        setPostContent={setPostContent}
        postContent={postContent}
        postFlair={postFlair}
        postTitle={postTitle}
        tags={tags}
        setPostTitle={setPostTitle}
        setTags={setTags}
        setPostFlair={setPostFlair}
        handleModalOpen={handleModalOpen}
        user_id={user_id}
      />
    </div>
  );
}

export default CreatePost;
