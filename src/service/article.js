import { ARTICLE_LIST } from "config/api";
import { get } from "utils/xFetch";

export const getArticles = async (data) => {
  const result = await get(ARTICLE_LIST, data);
  return result;
};
