import { MenuItem, MenuList, Paper } from "@material-ui/core";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const SideBar = ({ menu }) => {
  const history = useHistory();
  const location = useLocation();
  // const [anchorEl, setAnchorEl] = useState(null);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  return (
    <MenuList>
      {menu.map(({ title, path }) => (
        <MenuItem
          style={{
            background: path === location.pathname ? "rgba(0, 0, 0, 0.08)" : "",
          }}
          onClick={() => history.push(path)}
          key={path}
        >
          {title}
        </MenuItem>
      ))}
    </MenuList>
  );
};
