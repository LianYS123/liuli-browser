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
    cat: "all",
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
    <Container
      onScroll={(ev) => {
        const { scrollTop, clientHeight, scrollHeight } = ev.target;
        const isBottom = scrollTop + clientHeight > scrollHeight - 1000;
        if (isBottom && !isFetchingNextPage && hasNextPage) {
          fetchNext();
        }
      }}
      style={{ maxHeight: "100%", overflow: "auto", flex: 1 }}
    >
      <div className="search">
        <Search search={search} requestParams={requestParams} />
      </div>
      <Grid spacing={1} justifyContent='center' container>
        {items.map((item) => {
          return (
            <Grid key={item.id} item sm={12} md={4} xl={3}>
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
  );
};
