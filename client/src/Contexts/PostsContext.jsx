import React, { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetPosts } from "../hooks/apiQueries/api-queries";
const Context = React.createContext({});

export const usePost = () => {
  return useContext(Context);
};

export const PostProvider = ({ children }) => {
  const { postId } = useParams();
  const postObj = useGetPosts([`${postId}`]);
  const commentsByParentId = useMemo(() => {
    if (postObj.data?.comment_ids === null) return;
    const group = {};
    postObj.data?.comment_ids.forEach((comment) => {
      group[comment.parentComment_id] ||= [];
      group[comment.parentComment_id].push(comment);
    });
    return group;
  }, [postObj.data]);

  function getReplies(parentID) {
    return commentsByParentId[parentID];
  }
  function getParentId(childID) {
    for (const parentID in commentsByParentId) {
      for (const comment of commentsByParentId[parentID]) {
        if (comment._id === childID) return parentID;
      }
    }
  }
  return (
    <Context.Provider
      value={{
        post: { ...postObj.data },
        getReplies,
        rootComments: getReplies(null),
        getParentId,
      }}
    >
      {postObj.isLoading ? (
        <div>Loading</div>
      ) : postObj.isError ? (
        <div>Error</div>
      ) : (
        children
      )}
    </Context.Provider>
  );
};
