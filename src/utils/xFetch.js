import * as qs from "query-string";
import { errorHandler } from "./errorHandler";


export const xFetch = async (url, options = {}, config = {}) => {
  const { withPrefix = true } = config;
  try {
    const token = "Bearer " + localStorage.getItem("token");
    const response = await fetch(withPrefix ? `/api${url}` : url, {
      ...options,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    if (!response.ok) {
      const error = new Error("request error");
      error.response = response;
      throw error;
    }

    // if (isJumped) {
    //   return;
    // }
    const { data } = await response.json();
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const get = (url, data, options) => {
  const realUrl = `${url}?${qs.stringify(data)}`;
  return xFetch(realUrl, {
    method: "GET",
    ...options,
  });
};

export const post = (url, data, options) => {
  return xFetch(url, {
    method: "POST",
    body: data && JSON.stringify(data),
    ...options,
  });
};

export const del = (url, data, options) => {
  const realUrl = `${url}?${qs.stringify(data)}`;
  return xFetch(realUrl, {
    method: "DELETE",
    ...options,
  });
};

export const put = (url, data, options) => {
  return xFetch(url, {
    method: "PUT",
    body: data && JSON.stringify(data),
    ...options,
  });
};
