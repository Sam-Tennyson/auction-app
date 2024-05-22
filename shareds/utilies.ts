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
