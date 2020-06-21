import React, { useState } from "react";
import { List, ListItem, ListItemText, Drawer } from "@material-ui/core";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import SettingsIcon from "@material-ui/icons/Settings";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import { withRouter, RouteComponentProps } from "react-router-dom";

export const Sidebar = withRouter(
  (
    props: {
      openSidebar: boolean;
      setOpenSidebar: (val: boolean) => void;
      smallDevice: boolean;
    } & RouteComponentProps
  ) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
      <Drawer
        className={`${
          props.openSidebar && props.smallDevice === false ? "w-260px" : "w-0"
        }`}
        variant={props.smallDevice ? "temporary" : "persistent"}
        anchor="left"
        open={props.openSidebar}
        classes={{
          paper: `w-260px`,
        }}
        onClose={() => props.setOpenSidebar(false)}
      >
        <List
          className="flex flex-col w-full h-full text-white"
          disablePadding={true}
        >
          <ListItem
            className="cursor-pointer bg-sidebarDeep h-16"
            onClick={() => props.history.push("/events")}
          >
            <LocalLibraryIcon fontSize="large" />
            <span className="font-bold pl-2 pt-1 text-xl">Event Management</span>
          </ListItem>
          <List component="nav" className="flex-1 bg-sidebarLight">
            <ListItem
              className={`cursor-pointer ${
                selectedIndex === 0 && "bg-sidebarSelected"
              }`}
              onClick={() => {
                setSelectedIndex(0);
                props.history.push("/events");
                if (props.smallDevice) {
                  props.setOpenSidebar(false);
                }
              }}
            >
              <DeviceHubIcon className="pr-1 opacity-50" style={{ width: "40px" }} />
              <ListItemText
                primary={<span className="font-light px-1 text-base">Events</span>}
              />
            </ListItem>
            <ListItem
              className={`cursor-pointer ${
                selectedIndex === 1 && "bg-sidebarSelected"
              }`}
              onClick={() => {
                setSelectedIndex(1);
                props.history.push("/bookings");
                if (props.smallDevice) {
                  props.setOpenSidebar(false);
                }
              }}
            >
              <SettingsIcon className="pr-1 opacity-50" style={{ width: "40px" }} />
              <ListItemText
                primary={<span className="font-light px-1 text-base">Bookings</span>}
              />
            </ListItem>
          </List>
        </List>
      </Drawer>
    );
  }
);
