export const getQueryString = (params) =>
  Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
