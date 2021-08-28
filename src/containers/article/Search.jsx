import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useDeepCompareEffect } from "react-use";

export const Search = ({ requestParams, search }) => {
  const formik = useFormik({
    initialValues: requestParams,
    onSubmit: (values) => {
      // search(values);
      search(values);
    },
  });

  useDeepCompareEffect(() => {
    formik.setValues(requestParams);
  }, [requestParams]);

  return (
    <form style={{ margin: "16px 0" }} onSubmit={formik.handleSubmit}>
      <Grid spacing={1} container>
        <Grid item xs={6} sm={3} md={2}>
          <FormControl
            style={{ marginRight: 16, width: "100%" }}
            variant="standard"
            size="small"
          >
            <Input
              type="search"
              name="keyword"
              value={formik.values.keyword}
              onChange={formik.handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <FormControl
            style={{ marginRight: 16, width: "100%" }}
            variant="standard"
            size="small"
          >
            {/* <InputLabel>排序</InputLabel> */}
            <Select
              name="cat"
              value={formik.values.cat}
              onChange={formik.handleChange}
            >
              <MenuItem value="all">全部</MenuItem>
              {"文章 动画 漫画 小说 音乐".split(" ").map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <FormControl
            style={{ marginRight: 16, width: "100%" }}
            variant="standard"
            size="small"
          >
            {/* <InputLabel>排序</InputLabel> */}
            <Select
              name="orderType"
              value={formik.values.orderType}
              onChange={formik.handleChange}
            >
              <MenuItem value="asc">升序</MenuItem>
              <MenuItem value="desc">降序</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <FormControl
            style={{ width: "100%" }}
            variant="standard"
            size="small"
          >
            {/* <InputLabel>排序</InputLabel> */}
            <Select
              name="order"
              value={formik.values.order}
              onChange={formik.handleChange}
            >
              <MenuItem value="time">时间</MenuItem>
              <MenuItem value="rating_score">评分</MenuItem>
              <MenuItem value="rating_count">热度</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <Button type="submit">搜索</Button>
        </Grid>
      </Grid>
    </form>
  );
};
