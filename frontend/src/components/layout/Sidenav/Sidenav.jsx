import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Navbar } from "../../../data/header/hearderData";
import StarPurple500RoundedIcon from "@mui/icons-material/StarPurple500Rounded";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import ModalMoca from "../../common/ModalMoCa/ModalMoca";
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
  const navigate = useNavigate();
  // * xử lí show bản sideNav trên page
  const handleDrawer = () => {
    setOpen(!open);
    setActive(!isActive);
    setOpenIndex(null);
  };
  // * xử lí mở rộng hoặc thu gọn các thư mục con của mỗi ListItem
  const handleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    setOpen(true);
  };
  return (
    <>
     <Box sx={{ display: "flex", height: "100vh" }}>
      <Drawer
        sx={{ height: "100%",zIndex:999 }}
        variant="permanent"
        className=" flex justify-center relative }"
        open={open}
      >
        <DrawerHeader
          className="bg-[#00ADEF]  absolute w-full flex justify-start p-0 "
          onClick={()=>{navigate('/')}}
        >
          <IconButton
            sx={{
              width:'100%',
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              borderRadius: "8px",
            }}
          >
            {open ? <ListItemText sx={{color:'#ffff'}}  primary={<span className="font-semibold  text-lg">Hệ thống 315</span>}/> : <img className="w-10 h-10 " src="images/logo/logo_nhidong315.jpg" alt="logo Nhi đong 315" />}
            
            
          </IconButton>
        </DrawerHeader>
        <List
          className="bg-[#00ADEF]  h-full"
          sx={{ marginTop: 8, overflowX: "hidden", overflowY: "auto", padding:0, }}
        >
          {Navbar.map(({ label, icon, child }, index) => (
            <>
              <ListItem
                className="bg-[#00ADEF] "
                onClick={() => handleItem(index)}
                key={label}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    borderRadius: "8px",
                    transition: "all .2s",
                    color: "#DFF5FF",
                    "&:hover": { color: "#FFFF" },
                  }}
                >
                  <div className="mr-3">{icon}</div>
                  <ListItemText
                    primary={<span className="text-sm">{label}</span>}
                    sx={{ opacity: open ? 1 : 0,}}
                  />

                  {open ? (
                    openIndex === index ? (
                      <ExpandLess fontSize="small" />
                    ) : (
                      <ExpandMore fontSize="small" />
                    )
                  ) : (
                    ""
                  )}
                </ListItemButton>
              </ListItem>
              <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {child?.map(({ label, path }) => (
                    <ListItemButton
                      onClick={() => {
                        navigate(path);
                      }}
                      sx={{
                        color:'#DDDDDD',
                        pl: 3,
                        mx: 1,
                        fontSize:'12px',
                        borderRadius: "8px",
                        transition: "all .2s",
                        "&:hover": {
                          backgroundColor: "#00ADEF",
                          color: "#FFFF",
                        },
                      }}
                    >
                      <div className="mr-2">
                        <StarPurple500RoundedIcon />
                      </div>

                      <ListItemText primary={<span className="text-sm">{label}</span>} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        className="w-full h-full hidden lg:block bg-[#F4F5F7] "
      >
        <Header open={open} handleDrawer={handleDrawer} />
        <main className="mt-16">{props.children}</main>
      </Box>
     
    </Box>
    <ModalMoca />
    </>
   
  );
};

export default Sidenav;
