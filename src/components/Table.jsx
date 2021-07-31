import {
  Paper,
  // Skeleton,
  styled,
  Table,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { LoadingTableBody } from "./Loading";
import Pagination from "./Pagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const MyTable = (props) => {
  const { columns = [], dataSource = [], rowKey, pagination, loading } = props;
  const getRowKey = (dataItem, index) => {
    const realKey =
      typeof rowKey === "function"
        ? rowKey(dataItem, index)
        : dataItem[rowKey] || dataItem.id || index;
    return realKey;
  };

  const getAlign = (index) => (index === 0 ? "left" : "right");

  // render
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              {columns.map((it, index) => {
                const { dataIndex, title, key, render, ...rest } = it;
                return (
                  <StyledTableCell
                    align={getAlign(index)}
                    key={key || dataIndex || index}
                    {...rest}
                  >
                    {title}
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
          </TableHead>
          <LoadingTableBody loading={loading}>
            {dataSource.map((dataItem, index) => {
              return (
                <StyledTableRow key={getRowKey(dataItem, index)}>
                  {columns.map((column, innerIndex) => {
                    const { dataIndex, title, key, render, ...rest } = column;
                    const text = dataItem[dataIndex];
                    return (
                      <StyledTableCell
                        align={getAlign(innerIndex)}
                        title={title}
                        key={key || dataIndex || innerIndex}
                        {...rest}
                      >
                        {typeof render === "function"
                          ? render(text, dataItem, innerIndex)
                          : text}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </LoadingTableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}
        >
          <Pagination {...pagination} />
        </div>
      )}
    </div>
  );
};

export { MyTable };
export default MyTable;
