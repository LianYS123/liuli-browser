import { blue } from "@material-ui/core/colors";
import { FileCopyOutlined } from "@material-ui/icons";

// 提供限制文字长度、显示省略号、复制等功能
export const Text = ({
  limit,
  children,
  ellipsis = true,
  copy = false,
  wrap = true,
}) => {
  if (typeof children === "string") {
    if (limit && limit < children.length) {
      const substr = children.substring(0, limit);
      const contentStr = ellipsis ? (
        <span title={children}>{substr}...</span>
      ) : (
        substr
      );
      return (
        <span style={{ whiteSpace: wrap ? "normal" : "nowrap" }}>
          {copy ? (
            <>
              {contentStr}{" "}
              <FileCopyOutlined
                style={{
                  fontSize: ".9em",
                  cursor: "pointer",
                  color: blue[500],
                }}
                onClick={(ev) => {
                  navigator.clipboard.writeText(children);
                }}
              />
            </>
          ) : (
            contentStr
          )}
        </span>
      );
    } else {
      return children;
    }
  } else {
    console.warn("Text's children must be a string");
    return children;
  }
};
