import { Typography } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { FileCopyOutlined } from "@material-ui/icons";
import messageMounter from "components/mounter/showMessage";
import copy from "copy-to-clipboard";

// 提供限制文字长度、显示省略号、复制等功能
export const Text = ({
  limit,
  children,
  ellipsis = true,
  copy: canCopy = false,
  wrap = true,
}) => {
  const copyIcon = (
    <FileCopyOutlined
      style={{
        fontSize: ".9em",
        cursor: "pointer",
        color: blue[500],
      }}
      onClick={(ev) => {
        copy(children);
        messageMounter.open("复制成功");
      }}
    />
  );
  if (typeof children === "string" && limit && limit < children.length) {
    const substr = children.substring(0, limit);
    const contentStr = ellipsis ? (
      <span title={children}>{substr}...</span>
    ) : (
      substr
    );
    return (
      <span style={{ whiteSpace: wrap ? "normal" : "nowrap" }}>
        {canCopy ? (
          <>
            {contentStr} {copyIcon}
          </>
        ) : (
          contentStr
        )}
      </span>
    );
  } else if (ellipsis) {
    return (
      <section style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          style={{
            width: "100%",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
          variant="body2"
        >
          {children}
        </Typography>
        {canCopy && <div>{copyIcon}</div>}
      </section>
    );
  } else {
    return children;
  }
};
