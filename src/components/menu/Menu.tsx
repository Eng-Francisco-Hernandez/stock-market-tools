import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { Navigation } from "../../util-navigation/navigation";

interface MenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const menuItems: Array<MenuItem> = [
  {
    title: "Landing",
    path: Navigation.LANDING.path,
    icon: <InboxIcon />,
  },
  {
    title: "Inbox",
    path: Navigation.LANDING.path,
    icon: <MailIcon />,
  },
];

export default function Menu() {
  return (
    <div>
      <Toolbar>Menu</Toolbar>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding component={Link} to={item.path}>
            <ListItemButton>
              <ListItemIcon children={item.icon} />
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
}
