import { Pagination } from "@material-ui/core";

const MyPagination = (props) => {
  const { total = 0, pageSize = 10, onChange, current } = props;
  const count = Math.floor(total / pageSize) + (total % pageSize ? 1 : 0);
  const handleChange = (event, value) => {
    onChange(value, pageSize);
  };

  return (
    <Pagination
      // color="primary"
      shape="rounded"
      count={count}
      page={current}
      onChange={handleChange}
    />
  );
};

export default MyPagination;
