import React from "react";
import { FormControl, Input, MenuItem, Select, Stack } from "@material-ui/core";
import { useFormik } from "formik";
import { useDeepCompareEffect } from "react-use";

export const Search = ({ requestParams, search }) => {
  const formik = useFormik({
    initialValues: requestParams,
    onSubmit: (values) => {
      search(values);
    },
  });

  useDeepCompareEffect(() => {
    formik.setValues(requestParams);
  }, [requestParams]);

  const { order, orderType, cat } = formik.values;

  useDeepCompareEffect(() => {
    search(formik.values);
  }, [order, orderType, cat]);

  return (
    <form style={{ margin: "16px 0" }} onSubmit={formik.handleSubmit}>
      <Stack spacing={1} direction="row">
        <div>
          <FormControl variant="standard" size="small">
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
          <FormControl variant="standard" size="small">
            <Select
              name="orderType"
              value={formik.values.orderType}
              onChange={formik.handleChange}
            >
              <MenuItem value="asc">升序</MenuItem>
              <MenuItem value="desc">降序</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" size="small">
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
        </div>
        <FormControl variant="standard" size="small">
          <Input
            type="search"
            name="keyword"
            value={formik.values.keyword}
            placeholder="Press Enter"
            onChange={formik.handleChange}
            onKeyDown={(ev) => ev.key === "Enter" && formik.handleSubmit()}
          />
        </FormControl>
      </Stack>
    </form>
  );
};
