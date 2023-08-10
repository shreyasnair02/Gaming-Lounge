const URL = import.meta.env.VITE_SERVER_URL;
export const makeComment = async ({
  post_id,
  comment_body,
  user_id,
  parentComment_id,
}) => {
  const response = await fetch(URL + `/posts/${post_id}`, {
    method: "POST",
    body: JSON.stringify({ post_id, comment_body, user_id, parentComment_id }),
    credentials: "include",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const data = await response.json();
  return data;
};

export const editComment = async ({ post_id, comment_body, user_id, _id }) => {
  const response = await fetch(URL + `/posts/${post_id}`, {
    method: "PUT",
    body: JSON.stringify({ post_id, comment_body, user_id, _id }),
    credentials: "include",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  return data;
};

export const likeComment = async ({ post_id, user_id, _id, action }) => {
  const response = await fetch(URL + `/posts/${post_id}/like`, {
    method: "PUT",
    body: JSON.stringify({ post_id, _id, user_id, action }),

    credentials: "include",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  return data;
};
export const likePost = async ({ post_id, user_id, _id, action }) => {
  const response = await fetch(URL + `/posts/`, {
    method: "PUT",
    body: JSON.stringify({ post_id, user_id, action }),
    credentials: "include",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  return data;
};

export const deleteComment = async ({
  post_id,
  user_id,
  _id,
  parentComment_id,
}) => {
  const response = await fetch(URL + `/posts/${post_id}`, {
    method: "DELETE",
    body: JSON.stringify({ post_id, user_id, _id, parentComment_id }),

    credentials: "include",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  return data;
};

export const createUser = async ({ email_id, name, password }) => {
  const response = await fetch(URL + `/users/signup`, {
    method: "POST",
    body: JSON.stringify({ email_id, password, name }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const checkUser = async ({ email_id, password }) => {
  const response = await fetch(URL + `/users/login`, {
    method: "POST",
    body: JSON.stringify({ email_id, password }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const makePost = async ({ user_id, tags, postContent, postTitle }) => {
  const endpoint = "/posts";
  const response = await fetch(URL + `${endpoint}`, {
    method: "POST",
    body: JSON.stringify({
      user_id,
      tags,
      body: postContent,
      title: postTitle,
    }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
