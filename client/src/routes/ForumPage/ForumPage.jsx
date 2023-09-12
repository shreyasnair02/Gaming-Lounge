import React, { useState } from "react";
import { useGetPosts } from "../../hooks/apiQueries/api-queries";
import { Link } from "react-router-dom";
import PageWrapper from "../../utils/PageWrapper";
import { useLogin } from "../../Contexts/LoginContext";
import CreatePost from "./CreatePost";
import PostCard from "../../Components/PostCard";
import ForumPageSkeleton from "./skeletons/ForumPageSkeleton";
import { useQueryClient } from "@tanstack/react-query";

function ForumPage() {
  const queryClient = useQueryClient();
  const [sort, setSort] = useState("new");
  const handleSort = (e) => {
    setSort(e.target.value);
    queryClient.invalidateQueries(["posts"]);
  };

  const { isLoggedIn, user, setLoginData } = useLogin();
  return (
    <PageWrapper>
      <div className="px-8 lg:px-44 lg:py-4">
        <div className="flex w-full mb-4 items-center mt-4">
          <SortOptions handleSort={handleSort}></SortOptions>
          <>{isLoggedIn && <CreatePost user_id={user} />}</>
        </div>
        <Posts sort={sort}></Posts>
      </div>
    </PageWrapper>
  );
}

function SortOptions({ handleSort }) {
  return (
    <select
      className="select  select-bordered select-sm lg:select-lg lg:w-auto lg:max-w-xs"
      onChange={handleSort}
    >
      <option className="" value={"new"}>
        New
      </option>
      <option className="" value={"popular"}>
        Popular
      </option>
      <option className="" value={"top"}>
        Top
      </option>
      <option className="" value={"controversial"}>
        Controversial
      </option>
    </select>
  );
}

function Posts({ sort }) {
  const postsObj = useGetPosts([`?sort=${sort}`]);

  if (postsObj.isLoading) return <ForumPageSkeleton />;
  return (
    <>
      {Array.isArray(postsObj.data) ? (
        postsObj.data.map((post, i) => (
          <div key={post._id}>
            <Link to={`posts/${post._id}`}>
              <PostCard post={post} />
            </Link>
          </div>
        ))
      ) : (
        <p>{postsObj.data.message}</p>
      )}
    </>
  );
}
export default ForumPage;
