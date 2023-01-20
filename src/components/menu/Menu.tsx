import HomeIcon from "@mui/icons-material/Home";
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
    title: "Home",
    path: Navigation.LANDING.path,
    icon: <HomeIcon />,
  },
];

export default function Menu() {
  return (
    <div>
      <Toolbar></Toolbar>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding component={Link} to={item.path}>
            <ListItemButton>
              <ListItemIcon
                sx={{
                  color: "primary.dark",
                }}
                children={item.icon}
              />
              <ListItemText
                sx={{
                  color: "primary.main",
                }}
                primary={item.title}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
}
