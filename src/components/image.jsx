import { Backdrop } from "@material-ui/core";
import { useState } from "react";

export const Image = (props) => {
  const { src, alt, style, ...imgProps } = props;
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <img
        src={src}
        alt={alt}
        style={style}
        onClick={(ev) => setOpen(!isOpen)}
        {...imgProps}
      />
      <Backdrop
        onClick={(ev) => setOpen(false)}
        style={{ zIndex: 999 }}
        open={isOpen}
      >
        <img
          src={src}
          alt={alt}
          {...imgProps}
          style={{
            ...style,
            width: 800,
            height: 600,
            objectFit: "contain",
          }}
        />
      </Backdrop>
    </>
  );
};
