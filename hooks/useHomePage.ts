import { getCarouselData } from "@/api/common";
import { REACT_QUERY_KEYS } from "@/shareds/constants";
import { useQuery } from "@tanstack/react-query";

export const useFetchHomeCollection = () => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.HOME_COLLECITON],
    queryFn: getCarouselData,
  });
};
