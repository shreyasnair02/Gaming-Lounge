import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "../../utils/apiRequests/getPosts";
import {
  makeComment,
  editComment,
  likeComment,
  deleteComment,
  createUser,
  checkUser,
} from "../../utils/apiRequests/makeComment";

export const useGetPosts = (endpoint) => {
  const obj = useQuery({
    queryKey: ["posts", ...endpoint],
    queryFn: getPosts,
  });
  return obj;
};

// export const useMakePost=()=>{
//   const obj=useMutation({
//     mutationFn:
//   })
// }

export const useMakeComment = ({ toInvalidate, post_id }) => {
  const queryClient = useQueryClient();
  const obj = useMutation({
    mutationFn: makeComment,
    onSuccess: () => {
      console.log(toInvalidate);
      queryClient.invalidateQueries(toInvalidate);
    },
  });
  return obj;
};

export const useEditComment = ({ toInvalidate, post_id }) => {
  const queryClient = useQueryClient();
  const obj = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      console.log(toInvalidate);
      queryClient.invalidateQueries(toInvalidate);
    },
  });
  return obj;
};

export const useLikeComment = ({ toInvalidate, post_id }) => {
  const queryClient = useQueryClient();
  const obj = useMutation({
    mutationFn: likeComment,
    onSuccess: () => {
      console.log(toInvalidate);
      queryClient.invalidateQueries(toInvalidate);
    },
  });
  return obj;
};

export const useDeleteComment = ({ toInvalidate, post_id }) => {
  const queryClient = useQueryClient();
  const obj = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      console.log(toInvalidate);
      queryClient.invalidateQueries(toInvalidate);
    },
  });
  return obj;
};

export const useSignUp = () => {
  const obj = useMutation({
    mutationFn: createUser,
  });
  return obj;
};

export const useLogin = () => {
  const obj = useMutation({
    mutationFn: checkUser,
  });
  return obj;
};
