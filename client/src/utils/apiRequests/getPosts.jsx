const URL = import.meta.env.VITE_SERVER_URL;

export const getPosts = async ({ queryKey }) => {
  const endpoint = `/${queryKey?.join("/")}`;
  console.log("getting posts " + endpoint);
  const response = await fetch(URL + `${endpoint}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export const getLogout = async ({ queryKey }) => {
  const endpoint = `/users/logout`;
  const response = await fetch(URL + `${endpoint}`, { credentials: "include" });
  const data = await response.json();
  return data;
};

export const getAuth = async () => {
  const endpoint = `/users/checkauth`;
  const response = await fetch(URL + `${endpoint}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};
