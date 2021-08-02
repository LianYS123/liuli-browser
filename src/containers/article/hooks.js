
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { ARTICLE_LIST } from "config/api";
import { getArticles } from "service/article";

export const useTips = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isTipShow, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const showTipFunc = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
    setPlacement(newPlacement);
  };

  const hideTip = () => {
    setOpen(false);
  };

  return {
    anchorEl,
    isTipShow,
    placement,
    showTipFunc,
    hideTip,
  };
};

export const useArticles = () => {
  const [requestParams, setRequestParams] = useState({});
  const getPages = async ({ pageParam = 1 }) => {
    const result = await getArticles({ page: pageParam, ...requestParams });
    return result;
  };

  const res = useInfiniteQuery([ARTICLE_LIST, requestParams], getPages, {
    placeholderData: [],
    getNextPageParam: (pre) => {
      return pre.nextPage;
    },
  });
  return res;
};