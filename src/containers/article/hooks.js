import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { ARTICLE_LIST } from "config/api";
import { getArticles } from "service/article";

export const useArticles = (initialValues) => {
  const [requestParams, setRequestParams] = useState(initialValues);

  const getPages = async ({ pageParam = 1 }) => {
    const result = await getArticles({
      page: pageParam,
      pageSize: 20,
      ...requestParams,
    });
    return result;
  };

  const res = useInfiniteQuery([ARTICLE_LIST, requestParams], getPages, {
    placeholderData: [],
    getNextPageParam: (pre) => {
      if (pre.nextPage) {
        return pre.nextPage;
      }
    },
  });

  const search = (params) => {
    setRequestParams((oldParams) => ({ ...oldParams, ...params }));
  };

  return {
    ...res,
    requestParams,
    search,
  };
};
