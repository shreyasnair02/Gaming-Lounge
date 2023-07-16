const rawg_key = import.meta.env.VITE_RAWG_KEY;
const URL = `https://api.rawg.io/api/games?key=${rawg_key}&platforms=18,1,7`;

export const getGames = async ({ queryKey }) => {
  let endpoint = "&ordering=";
  for (let i = 1; i < queryKey.length; i++) {
    endpoint += queryKey[i];
  }
  if (queryKey[1] == "new") {
    endpoint = `&dates=2022-01-01,2023-12-31`;
  }
  const response = await fetch(URL + endpoint);
  const obj = await response.json();
  return obj;
};
