import React, { useEffect } from "react";
import {
  Button,
  FormControl,
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
      <FormControl style={{ marginRight: 16 }} variant="standard" size="small">
        <Input
          type="search"
          name="keyword"
          value={formik.values.keyword}
          onChange={formik.handleChange}
        />
      </FormControl>
      <FormControl style={{ marginRight: 16 }} variant="standard" size="small">
        {/* <InputLabel>排序</InputLabel> */}
        <Select
          style={{ width: 200 }}
          name="orderType"
          value={formik.values.orderType}
          onChange={formik.handleChange}
        >
          <MenuItem value="asc">升序</MenuItem>
          <MenuItem value="desc">降序</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" size="small">
        {/* <InputLabel>排序</InputLabel> */}
        <Select
          style={{ width: 200 }}
          name="order"
          value={formik.values.order}
          onChange={formik.handleChange}
        >
          <MenuItem value="time">时间</MenuItem>
          <MenuItem value="rating_score">评分</MenuItem>
          <MenuItem value="rating_count">热度</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit">搜索</Button>
    </form>
  );
};
