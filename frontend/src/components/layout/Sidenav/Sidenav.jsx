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
import logo315 from "../../../assets/images/logo/logo_nhidong315.jpg";

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
      <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
        <Box>
          <Box
            className={
              open
                ? "w-[200px]  h-full bg-[#00ADEF] "
                : "w-[65px] relative bg-[#00ADEF] "
            }
          >
            <div className="fixed bg-[#00ADEF] h-full">
              <div
                className={
                  open ? "w-[180px] relative bg-[#00ADEF]" : "w-[60px] relative bg-[#00ADEF]"
                }
              >
                <List
                  className="bg-[#00ADEF]  bg-scroll"
                  style={{
                    scrollbarColor: "#dceaf3",
                  }}
                  sx={{
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
                            <div>
                              <GroupIcon />
                            </div>
                          ) : idMenu === 3 ? (
                            <div>
                              <MarkunreadMailboxIcon />
                            </div>
                          ) : idMenu === 4 ? (
                            <div>
                              <WarehouseIcon />
                            </div>
                          ) : idMenu === 5 ? (
                            <div>
                              <StorefrontIcon />
                            </div>
                          ) : idMenu === 6 ? (
                            <div>
                              <AddModeratorIcon />
                            </div>
                          ) : idMenu === 7 ? (
                            <div>
                              <MedicationIcon />
                            </div>
                          ) : idMenu === 8 ? (
                            <div>
                              <VaccinesIcon />
                            </div>
                          ) : idMenu === 9 ? (
                            <div>
                              <AddCardIcon />
                            </div>
                          ) : idMenu === 10 ? (
                            <div>
                              <ContentPasteSearchIcon />
                            </div>
                          ) : idMenu === 11 ? (
                            <div>
                              <LineAxisIcon />
                            </div>
                          ) : idMenu === 12 ? (
                            <div>
                              <CategoryIcon />
                            </div>
                          ) : idMenu === 13 ? (
                            <div>
                              <AutoAwesomeIcon />
                            </div>
                          ) : idMenu === 14 ? (
                            <div>
                              <SupportAgentIcon />
                            </div>
                          ) : (
                            ""
                          )}
                          {/* <div className="mr-3">{icon}</div> */}
                          {open && (
                            <ListItemText
                              primary={
                                <span className="text-[12px]">{tenMenu}</span>
                              }
                              sx={{
                                // opacity: open ? 1 : 0,
                                marginLeft: 2,
                                textAlign: "unset",
                              }}
                            />
                          )}
                          {/* <ListItemText
                        primary={<span className="text-[12px]">{tenMenu}</span>}
                        sx={{
                          opacity: open ? 1 : 0,
                          marginLeft: open ? 2 : 0,
                          textAlign: "unset",
                        }}
                      /> */}

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
                      {JSON.parse(chilD_MENUS)[0].IDMENU ? (
                        <Collapse
                          in={openIndex === index}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            {JSON.parse(chilD_MENUS)?.map(
                              ({ IDMENU, TENMENU, LINKS }) => (
                                <ListItemButton
                                  onClick={() => {
                                    navigate(LINKS);
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
                                    primary={
                                      <span className="text-[12px]">
                                        {TENMENU}
                                      </span>
                                    }
                                  />
                                </ListItemButton>
                              )
                            )}
                          </List>
                        </Collapse>
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </List>
              </div>
            </div>
          </Box>
        </Box>

        <Box
        // className="hidden lg:block bg-[#F4F5F7] "
        >
          <div>
            <Header open={open} handleDrawer={handleDrawer} />
            <main>{props.children}</main>
          </div>
        </Box>
      </Box>
      <ModalMoca />
    </>
  );
};

export default Sidenav;
