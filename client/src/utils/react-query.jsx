import { useQuery } from "@tanstack/react-query";
const rawg_key = import.meta.env.VITE_RAWG_KEY;
export const useGet = () => {
  const obj = useQuery([], {
    queryFn: async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${rawg_key}&dates=2020-09-01,2023-01-01&platforms=18,1,7`
      );
      const obj = await response.json();
      return obj;
    },
  });
  return obj;
};
