import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { withRouter, RouteComponentProps } from "react-router-dom";

export const Topbar = withRouter((props: { 
  setOpenSidebar: () => void;
} & RouteComponentProps) => {
  const [openProfilePopover, setOpenProfilePopover] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <>
      <AppBar position="static">
        <Toolbar className="bg-white text-gray-700">
          <div>
            <IconButton
              className="focus:outline-none"
              color="inherit"
              aria-label="menu"
              onClick={() => props.setOpenSidebar()}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div className="flex-1 float-right">
            <IconButton
              className="float-right focus:outline-none"
              color="inherit"
              aria-label="user-info"
              onClick={(e) => {
                setOpenProfilePopover(true);
                setAnchorEl(e.currentTarget as any);
              }}
            >
              <PowerSettingsNewIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Popover
        id="profile-popover"
        open={openProfilePopover}
        anchorEl={anchorEl}
        onClose={() => {
          setOpenProfilePopover(false);
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List>
          <ListItem button>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem 
            button
            onClick={e => {
              e.preventDefault();
              props.history.push('/');
            }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Popover>
    </>
  );
});
