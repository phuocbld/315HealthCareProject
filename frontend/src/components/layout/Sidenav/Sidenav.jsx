import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Navbar } from "../../../data/header/hearderData";
const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  position: "relative",
  justifyContent: "space-between",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  position: "relative",
  justifyContent: "space-between",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const Sidenav = (props) => {
  const [open, setOpen] = React.useState(true);
  const [isActive, setActive] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  // * xử lí show bản sideNav trên page
  const handleDrawer = () => {
    setOpen(!open);
    setActive(!isActive);
    setOpenIndex(null);
  };
  // * xử lí mở rộng hoặc thu gọn các thư mục con của mỗi ListItem
  const handleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    setOpen(true)
  };
  return (
    <Box  sx={{ display: "flex", height:'100vh',paddingTop:'75px'}}>
      <Drawer sx={{height:'100%'}} variant="permanent" className=" flex justify-between }" open={open}>
        <List sx={{maxHeight:'100%',overflow:'auto'}} >
          {Navbar.map(({label,icon},index) => (
            <>
              <ListItem
                onClick={() => handleItem(index)}
                key={label}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  {open ? <ListItemText primary={label}  /> : ''}
                  {open ? openIndex === index ? <ExpandLess /> : <ExpandMore /> : '' }
                </ListItemButton>
              </ListItem>
              <Collapse className="" in={openIndex === index} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button>
                    <ListItemText primary="Thư mục con 1" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Thư mục con 2" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Thư mục con 1" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Thư mục con 2" />
                  </ListItem>
                </List>
              </Collapse>
            </>
          ))}
        </List>
        <DrawerHeader className="bg-sky-200 absolute w-full bottom-0 "  onClick={handleDrawer}>
          <IconButton>
            {isActive ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
      </Drawer>
      <Box component="main" className="w-screen h-full" >
        {props.children}
      </Box>
    </Box>
  );
};

export default Sidenav;
