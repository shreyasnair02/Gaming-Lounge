const URL = import.meta.env.VITE_SERVER_URL;

export const getPosts = async ({ queryKey }) => {
  const endpoint = `/${queryKey?.join("/")}`;
  const response = await fetch(URL + `${endpoint}`);
  console.log(URL + endpoint);
  const data = await response.json();
  return data;
};
