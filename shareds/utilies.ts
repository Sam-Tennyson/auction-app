import { CLOUDFRONT_URL } from "@/api";

export function generateQueryParamString(arr: any, paramName = "fields") {
  return arr
    .map((value: any, index: number) => `${paramName}[${index}]=${value}`)
    .join("&");
}

export const sanitizeStrapiData = (data: any) => {
  const sanitizeData = data?.map((item: any) => ({
    id: item?.id,
    ...item?.attributes,
  }));
  return sanitizeData;
};

export const getImageCloudfrontUrl = (item: { imageURL: string }) => {
  const imageUrl = `${CLOUDFRONT_URL}${item?.imageURL}`;
  return imageUrl;
};
