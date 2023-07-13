import { useQuery } from "@tanstack/react-query";
import { getGames } from "../utils/getGames";
const rawg_key = import.meta.env.VITE_RAWG_KEY;

export const useGet = (objParams) => {
  const obj = useQuery({
    queryKey: ["games", [...objParams]],
    queryFn: getGames,
  });
  return obj;
};
