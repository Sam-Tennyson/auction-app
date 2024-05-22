import { getRequest } from "@/shareds/axios";
import { API_BASE_URL } from ".";
import {
  generateQueryParamString,
  sanitizeStrapiData,
} from "@/shareds/utilies";
import { ICategoryCollection } from "@/types";

export const fetchCategories = async () => {
  try {
    const REQUIRED_KEYS = generateQueryParamString(["name", "slug"]);
    const URL =
      API_BASE_URL + "/api/categories?sort[0]=name:asc&" + REQUIRED_KEYS;

    const { data: responseData } = await getRequest({ API: URL });
    const sendResponse = sanitizeStrapiData(responseData?.data);
    // console.log(sendResponse);
    return sendResponse ?? [];
  } catch (error) {
    console.log(error);
  }
};

export const fetchLocations = async () => {
  try {
    const REQUIRED_KEYS = generateQueryParamString(["name", "slug"]);
    const URL =
      API_BASE_URL +
      "/api/locations?sort[0]=name:asc&pagination[page]=1&pagination[pageSize]=1000&" +
      REQUIRED_KEYS;

    const { data: responseData } = await getRequest({ API: URL });
    const sendResponse = sanitizeStrapiData(responseData?.data);
    // console.log(sendResponse);
    return sendResponse ?? [];
  } catch (error) {
    console.log(error);
  }
};

export const fetchBanks = async () => {
  try {
    const REQUIRED_KEYS = generateQueryParamString(["name", "slug"]);
    const URL =
      API_BASE_URL +
      "/api/banks?sort[0]=name:asc&pagination[page]=1&pagination[pageSize]=1000&" +
      REQUIRED_KEYS;

    const { data: responseData } = await getRequest({ API: URL });
    const sendResponse = sanitizeStrapiData(responseData?.data);
    // console.log(sendResponse);
    return sendResponse ?? [];
  } catch (error) {
    console.log(error);
  }
};

export const fetchAssetTypes = async () => {
  try {
    const REQUIRED_KEYS = generateQueryParamString(["name", "slug"]);
    const URL =
      API_BASE_URL + "/api/asset-types?sort[0]=name:asc&" + REQUIRED_KEYS;

    const { data: responseData } = await getRequest({ API: URL });
    const sendResponse = sanitizeStrapiData(responseData?.data);
    // console.log(sendResponse);
    return sendResponse ?? [];
  } catch (error) {
    console.log(error);
  }
};

export const getCollectionData = async (props: { endpoints: string }) => {
  try {
    const { endpoints } = props;
    const requiredkeys = generateQueryParamString(["name", "slug", "imageURL"]);
    // console.log(requiredkeys, "requiredkeys");
    let filter =
      endpoints + `?populate=*&filters[isPopular]=true&${requiredkeys}`;
    if (endpoints === "locations") {
      filter += `&filters[type]=city`;
    }
    const URL = API_BASE_URL + `/api/` + filter;
    // console.log(URL, "URL");
    const { data } = await getRequest({ API: URL });
    const sendResponse = sanitizeStrapiData(data.data) as any;
    return sendResponse;
  } catch (e) {
    console.log(e, "auctionDetail error collection");
  }
};

export const getCarouselData = async () => {
  try {
    const URL = API_BASE_URL + "/api/home-box-collections";
    const { data } = await getRequest({ API: URL });
    const categories = sanitizeStrapiData(data.data) as ICategoryCollection;

    const categorizedData = await Promise.all(
      categories.map(async (category: any) => {
        const collectionData = await getCollectionData({
          endpoints: category.strapiAPIQuery,
        });
        return { ...category, collectionData };
      })
    );

    // console.log(categorizedData, "categorizedData");
    return categorizedData;
  } catch (e) {
    console.log(e, "auctionDetail error Home-box");
  }
};
