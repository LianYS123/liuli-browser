// import { useRequest, useTable } from "hooks";
import { getArticles } from "service/article";
import dayjs from "dayjs";
import { DATE_FORMATE } from "constants/index";
import {
  Button,
  Chip,
  Container,
  Input,
  Link,
  Paper,
  Popper,
} from "@material-ui/core";
import { Text } from "components/Text";
import { useFormik } from "formik";
import { Image } from "components/Image";

import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { useArticles, useTips } from "./hooks";

export const Article = () => {
  const { data, isFetching, fetchNextPage, hasNextPage } = useArticles();
  const { anchorEl, isTipShow, placement, showTipFunc, hideTip } = useTips();

  const formik = useFormik({
    initialValues: {
      keyword: "",
    },
    onSubmit: (values) => {
      // search(values);
      setRequestParams(values);
    },
  });

  console.log(data);

  return (
    <Container>
      <form style={{ margin: "8px 0" }} onSubmit={formik.handleSubmit}>
        <Input
          type="search"
          name="keyword"
          value={formik.values.keyword}
          onChange={formik.handleChange}
        />
        <Button type="submit">搜索</Button>
      </form>
      <Popper placement="top" anchorEl={anchorEl} open={isTipShow}>
        <Paper>{placement && placement.content}</Paper>
      </Popper>
      {/* <ImageList rowHeight={250}>
        {data?.pages
          ?.reduce((res, cur) => [...res, ...cur.list], [])
          .map((item) => {
            const {
              id,
              title,
              imgSrc,
              time,
              tags,
              content,
              ratingCount,
              ratingScore,
            } = item;
            return (
              <ImageListItem key={id}>
                <Image
                  src={imgSrc}
                  alt={title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <ImageListItemBar
                  title={title}
                  subtitle={
                    <span>发布时间: {dayjs(time).format(DATE_FORMATE)}</span>
                  }
                  actionIcon={
                    <IconButton onClick={showTipFunc(item)}>
                      <InfoIcon
                        color="white"
                        onMouseOut={hideTip}
                      />
                    </IconButton>
                  }
                />
              </ImageListItem>
            );
          })}
      </ImageList> */}
      {isFetching
        ? "loading..."
        : hasNextPage && (
            <Button onClick={() => fetchNextPage()}>fetch more</Button>
          )}
    </Container>
  );
};
