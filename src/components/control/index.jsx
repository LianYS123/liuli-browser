import React from "react";
// import classNames from "clsx";
import { Button, Link, Stack } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export const Control = ({
  options = [],
  actions,
  execCommand = (command, opts) => {
    actions[command](opts);
  },
  ...stackProps
}) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="flex-end"
      {...stackProps}
    >
      {options
        .filter((it) => !it.hidden)
        .map((props) => {
          const { title, type, command, danger, record, ...btnProps } = props;
          const Comp = type === "link" ? Link : Button;
          return (
            <Comp
              key={title}
              component="button"
              color={danger ? red[500] : undefined}
              onClick={(ev) => {
                ev.stopPropagation();
                ev.preventDefault();
                if (typeof command === "string" && execCommand) {
                  execCommand(command, props);
                } else if (typeof command === "function") {
                  command(props);
                }
              }}
              {...btnProps}
            >
              {title}
            </Comp>
          );
        })}
    </Stack>
  );
};

export const TableCellControl = ({ record, options = [], ...props }) => (
  <Control
    options={options.map((it) => ({
      record,
      type: "link",
      ...it,
    }))}
    {...props}
  />
);

export const ActionControl = ({ ...props }) => <Control {...props} />;
