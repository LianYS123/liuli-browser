import React, { useCallback } from "react";
import { Button, Container, Grid } from "@material-ui/core";
import { useArticles } from "./hooks";
import { throttle } from "lodash";
import ArticleItem from "./ArticleItem";
import { Search } from "./Search";

export const Article = () => {
  const initialValues = {
    keyword: "",
    order: "time",
    orderType: "desc",
  };

  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    search,
    isFetchingNextPage,
    requestParams,
  } = useArticles(initialValues);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchNext = useCallback(throttle(fetchNextPage, 1000), []);
  const items =
    data?.pages?.reduce((res, cur) => [...res, ...cur.list], []) || [];

  return (
    // 必须加overflow属性
    <div
      onScroll={(ev) => {
        const { scrollTop, clientHeight, scrollHeight } = ev.target;
        const isBottom = scrollTop + clientHeight > scrollHeight - 1000;
        if (isBottom && !isFetchingNextPage && hasNextPage) {
          fetchNext();
        }
      }}
      style={{ maxHeight: "100%", overflow: "auto" }}
    >
      <Container>
        <Search search={search} requestParams={requestParams} />
        <Grid container spacing={2}>
          {items.map((item) => {
            return (
              <Grid key={item.id} item xs={6} md={4}>
                <ArticleItem search={search} {...item}></ArticleItem>
              </Grid>
            );
          })}
        </Grid>

        {isFetching
          ? "loading..."
          : hasNextPage && (
              <Button onClick={() => fetchNext()}>fetch more</Button>
            )}
      </Container>
    </div>
  );
};
