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
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  return data;
};
