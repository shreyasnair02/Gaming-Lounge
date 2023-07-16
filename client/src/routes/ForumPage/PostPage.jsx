import React from "react";
import PageWrapper from "../../utils/PageWrapper";
import { useParams } from "react-router-dom";
import {
  useGetPosts,
  useMakeComment,
} from "../../hooks/apiQueries/api-queries";
import { usePost } from "../../Contexts/PostsContext";
import CommentsList from "../../Components/Comments/CommentsList";
import CommentForm from "../../Components/Comments/CommentForm";

function PostPage() {
  const { post, rootComments, getReplies } = usePost();
  const newCommentMutation = useMakeComment({
    post_id: post._id,
    toInvalidate: ["posts", `${post._id}`],
  });
  return (
    <PageWrapper>
      <div className="min-w-full">
        {post && (
          <div className=" min-w-[75%] flex flex-col gap-48 ml-10">
            <div>
              <h1 className="text-7xl">{post.title}</h1>
              <p className="text-xl">{post.body}</p>
            </div>
            <div className="min-w-[55%] mr-[30%]">
              comments
              <div>
                <CommentForm
                  onSubmit={newCommentMutation.mutate}
                  loading={newCommentMutation.isLoading}
                  error={newCommentMutation.isError}
                  post_id={post._id}
                />
              </div>
              <div>
                {rootComments && <CommentsList comments={rootComments} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default PostPage;
