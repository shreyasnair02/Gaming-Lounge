import React from "react";
import { getPosts } from "../../utils/apiRequests/getPosts";
import { useGetPosts } from "../../hooks/apiQueries/api-queries";
import { Link } from "react-router-dom";
import PageWrapper from "../../utils/PageWrapper";
import { useLogin } from "../../Contexts/LoginContext";
import CreatePost from "./CreatePost";
import PostCard from "../../Components/PostCard";
function ForumPage() {
  const postsObj = useGetPosts([]);
  const { isLoggedIn, user, setLoginData } = useLogin();
  return (
    <PageWrapper>
      <div>
        <div>
          {postsObj.data?.map((post, i) => (
            <div key={post._id}>
              <Link to={`posts/${post._id}`}>
                <PostCard post={post} />
              </Link>
            </div>
          ))}
        </div>
        <div>{isLoggedIn && <CreatePost user_id={user.user_id} />}</div>
      </div>
    </PageWrapper>
  );
}

export default ForumPage;
