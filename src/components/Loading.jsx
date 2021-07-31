import { CircularProgress } from "@material-ui/core";

const ShadowWrapper = ({ component, children }) => {
  const Wrapper = component || "div";
  return (
    <Wrapper
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(256,256,256,.6)",
      }}
    >
      {children}
    </Wrapper>
  );
};

const Loading = (props) => {
  const { children, loading = false, component } = props;
  const Comp = component || "div";
  return (
    <Comp style={{ position: "relative" }}>
      {children}
      {loading && (
        <ShadowWrapper>
          <CircularProgress />
        </ShadowWrapper>
      )}
    </Comp>
  );
};

export const LoadingTableBody = (props) => {
  const { children, loading = false } = props;
  return (
    <tbody style={{ position: "relative" }}>
      {children}
      {loading && (
        <ShadowWrapper component="tr">
          <td>
            <CircularProgress />
          </td>
        </ShadowWrapper>
      )}
    </tbody>
  );
};

export default Loading;
