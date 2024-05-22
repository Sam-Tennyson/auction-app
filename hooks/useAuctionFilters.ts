import {
  fetchAssetTypes,
  fetchBanks,
  fetchCategories,
  fetchLocations,
} from "@/api/common";
import { REACT_QUERY_KEYS } from "@/shareds/constants";
import { IAssetType, IBanks, ICategoryCollection, ILocations } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchCategories = () => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.CATEGORIES],
    queryFn: async () => {
      const response = (await fetchCategories()) as ICategoryCollection[];
      if (response?.length) {
        return [
          { label: "All", value: "" },
          ...response.map((item: ICategoryCollection) => ({
            ...item,
            label: item?.name,
            value: item?.name,
          })),
        ];
      }
      return [];
    },
  });
};

export const useFetchLocations = () => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.LOCATIONS],
    queryFn: async () => {
      const response = (await fetchLocations()) as ILocations[];
      if (response?.length) {
        return [
          { label: "All", value: "" },
          ...response.map((item: ILocations) => ({
            ...item,
            label: item?.name,
            value: item?.name,
          })),
        ];
      }
      return [];
    },
  });
};

export const useFetchAssetTypes = () => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.ASSET_TYPES],
    queryFn: async () => {
      const response = (await fetchAssetTypes()) as IAssetType[];
      if (response?.length) {
        return [
          { label: "All", value: "" },
          ...response.map((item: IAssetType) => ({
            ...item,
            label: item?.name,
            value: item?.name,
          })),
        ];
      }
      return [];
    },
  });
};

export const useFetchBanks = () => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.BANKS],
    queryFn: async () => {
      const response = (await fetchBanks()) as IBanks[];
      if (response?.length) {
        return [
          { label: "All", value: "" },
          ...response.map((item: IBanks) => ({
            ...item,
            label: item?.name,
            value: item?.name,
          })),
        ];
      }
      return [];
    },
  });
};
