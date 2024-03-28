import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import GroupIcon from "@mui/icons-material/Group";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import MedicationIcon from "@mui/icons-material/Medication";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import AddCardIcon from "@mui/icons-material/AddCard";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import CategoryIcon from "@mui/icons-material/Category";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarPurple500RoundedIcon from "@mui/icons-material/StarPurple500Rounded";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import ModalMoca from "../../common/ModalMoCa/ModalMoca";
import { useDispatch, useSelector } from "react-redux";
import { getListMenu } from "../../../store/actions/userAction";
import { customMenu } from "../../../utils/customMenu";
import logo315 from '../../../assets/images/logo/logo_nhidong315.jpg'
const drawerWidth = 180;

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
  const { menu } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const demoMenu = () => {
    customMenu(menu);
    dispatch();
  };
  useEffect(() => {
    const infoUser = localStorage.getItem("USER_INFO");
    // chuyển json về Object
    const newInfoUser = JSON.parse(infoUser);
    dispatch(getListMenu(newInfoUser.taiKhoan));
  }, []);
  return (
    <>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Drawer
          sx={{ height: "100%", zIndex: 999 }}
          variant="permanent"
          className=" flex justify-center relative }"
          open={open}
        >
          <DrawerHeader
          style={{
            padding:0
          }}
            className="bg-[#00ADEF]  absolute w-full flex justify-start  "
            onClick={() => {
              navigate("/");
            }}
          >
            <IconButton
              sx={{
                width: "100%",
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                borderRadius: "8px",
              }}
            >
              {open ? (
                <ListItemText
                  sx={{ color: "#ffff" }}
                  primary={
                    <span className="font-semibold  text-[16px]">Hệ thống 315</span>
                  }
                />
              ) : (
                <img
                  className="w-10 h-10 "
                  src={logo315}
                  alt="logo Nhi đong 315"
                />
              )}
            </IconButton>
          </DrawerHeader>
          <List
            className="bg-[#00ADEF]  h-full bg-scroll"
            style={{
              scrollbarColor: "#dceaf3",
            }}
            sx={{
              marginTop: 8,
              overflowX: "hidden",
              overflowY: "auto",
              padding: 0,
              scrollbarColor: "#dceaf3",
            }}
          >
            {menu?.map(({ idMenu, tenMenu, chilD_MENUS }, index) => (
              <>
                <ListItem
                  className="bg-[#00ADEF] "
                  onClick={() => handleItem(index)}
                  key={idMenu}
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
                    {idMenu === 1 ? (
                      <div>
                        <DisplaySettingsIcon />
                      </div>
                    ) : idMenu === 2 ? (
                      <div >
                        <GroupIcon />
                      </div>
                    ) : idMenu === 3 ? (
                      <div >
                        <MarkunreadMailboxIcon />
                      </div>
                    ) : idMenu === 4 ? (
                      <div >
                        <WarehouseIcon />
                      </div>
                    ): idMenu === 5 ? (
                      <div >
                        <StorefrontIcon />
                      </div>
                    ): idMenu === 6 ? (
                      <div >
                        <AddModeratorIcon />
                      </div>
                    ):idMenu === 7 ? (
                      <div >
                        <MedicationIcon />
                      </div>
                    ):idMenu === 8 ? (
                      <div >
                        <VaccinesIcon />
                      </div>
                    ): idMenu === 9 ? (
                      <div >
                        <AddCardIcon />
                      </div>
                    ): idMenu === 10 ? (
                      <div >
                        <ContentPasteSearchIcon />
                      </div>
                    ):idMenu === 11 ? (
                      <div>
                        <LineAxisIcon />
                      </div>
                    ):idMenu === 12 ? (
                      <div >
                        <CategoryIcon />
                      </div>
                    ):idMenu === 13 ? (
                      <div >
                        <AutoAwesomeIcon />
                      </div>
                    ):idMenu === 14 ? (
                      <div >
                        <SupportAgentIcon />
                      </div>
                    ):''}
                    {/* <div className="mr-3">{icon}</div> */}
                    <ListItemText
                      
                      primary={<span className="text-[12px]">{tenMenu}</span>}
                      sx={{ opacity: open ? 1 : 0 ,
                      marginLeft:open ? 2 : 0 ,
                      textAlign:'unset'
                      }}
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
                {JSON.parse(chilD_MENUS)[0].IDMENU ? <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {JSON.parse(chilD_MENUS)?.map(({IDMENU ,TENMENU, LINKS }) => (
                      <ListItemButton
                        onClick={() => {
                          navigate(LINKS)
                          // IDMENU === 21 ? navigate('/nhan-benh') : IDMENU === 42 ? navigate('/thumuakho/chuyenkho') : navigate('/Dashboard')
                        }}
                        sx={{
                          color: "#DDDDDD",
                          pl: 3,
                          mx: 1,
                          fontSize: "12px",
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

                        <ListItemText
                          primary={<span className="text-[12px]">{TENMENU}</span>}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse> : ''}
                
              </>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          className="w-full h-full hidden lg:block bg-[#F4F5F7] "
        >
          <Header open={open} handleDrawer={handleDrawer} />
          <main className="mt-16 h-[93%]">{props.children}</main>
        </Box>
      </Box>
      <ModalMoca />
    </>
  );
};

export default Sidenav;
