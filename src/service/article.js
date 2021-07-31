import { get } from "utils/xFetch";

export const getArticles = (data) => {
  return get("/article/list", data);
};
