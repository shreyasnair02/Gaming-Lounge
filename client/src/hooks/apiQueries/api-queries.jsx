import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts, getLogout, getAuth } from "../../utils/apiRequests/getPosts";
import {
  makeComment,
  editComment,
  likeComment,
  deleteComment,
  createUser,
  checkUser,
  makePost,
  likePost
} from "../../utils/apiRequests/makeComment";

export const useGetPosts = (endpoint) => {
  const obj = useQuery({
    queryKey: ["posts", ...endpoint],
    queryFn: getPosts,
  });
  return obj;
};

export const useMakePost = () => {
  const queryClient = useQueryClient();
  const obj = useMutation({
    mutationFn: makePost,
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });
  return obj;
};

export const useMakeComment = ({ toInvalidate, post_id }) => {
  const queryClient = useQueryClient();
  const obj = useMutation({
    mutationFn: makeComment,
    onSuccess: () => {
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
      queryClient.invalidateQueries(toInvalidate);
    },
  });
  return obj;
};

export const useLikePost = ({ toInvalidate, post_id }) => {
  const queryClient = useQueryClient();
  const obj = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
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

export const useLogout = (endpoint) => {
  const obj = useQuery({
    queryKey: ["user", "logout"],
    queryFn: getLogout,
    enabled: false,
  });

  const handleLogout = async (setLoginData) => {
    try {
      await obj.refetch();
      setLoginData(false, null);
    } catch (error) {}
  };
  return { handleLogout, isLoggingout: obj.isLoading };
};

export const useCheckAuth = () => {
  const obj = useQuery({
    queryKey: ["user", "checkAuth"],
    queryFn: getAuth,
  });

  return obj;
};
