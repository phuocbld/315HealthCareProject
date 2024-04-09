import React, { useEffect, useState } from "react";
// import Header from '../components/layout/Header/Header'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Sidenav from "../components/layout/Sidenav/Sidenav";
import Reponsive from "../pages/Reponsive/Reponsive";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, ConfigProvider } from "antd";
import ButtonLang from "../components/common/ButtonLang/ButtonLang";
import Notification from "../components/common/Notificaton/Notification";
import Avatars from "../components/common/Avatar/Avatars";
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
import GroupsIcon from "@mui/icons-material/Groups";
import { getListMenu } from "../store/actions/userAction";
import logo from "../assets/images/logo/MemLogo_315_Logo.png";
const { Header, Sider, Content } = Layout;
const LayoutApp = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { menu } = useSelector((state) => state.userReducer);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const infoUser = localStorage.getItem("USER_INFO");
    // chuyển json về Object
    const newInfoUser = JSON.parse(infoUser);
    dispatch(getListMenu(newInfoUser.taiKhoan));
  }, []);
  return (
    <Layout className="hidden lg:flex">
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              darkItemBg: "#00AFEF",
              // darkPopupBg:'#00AFEF',
              darkSubMenuItemBg: "#0396CD",
            },
          },
        }}
      >
        <Sider
          trigger={null}
          style={{
            backgroundColor: "#00AFEF",
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
          collapsible
          collapsed={collapsed}
        >
          <div className=" h-12 flex  justify-center items-center">
            {!collapsed ? (
              <Link to="/">
                <h2 className="text-lg font-semibold text-white">
                  Hệ Thống 315
                </h2>
              </Link>
            ) : (
              <Link to="/">
                <img className="w-16" src={logo} alt="logo nhi dong 315" />
              </Link>
            )}
          </div>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={menu?.map(({ idMenu, tenMenu, chilD_MENUS }) => ({
              key: idMenu,
              icon:
                idMenu === 1 ? (
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
                ) : idMenu === 81 ? (
                  <div>
                    <GroupsIcon />
                  </div>
                ) : (
                  ""
                ),
              label: tenMenu,
              children: JSON.parse(chilD_MENUS)[0].IDMENU
                ? JSON.parse(chilD_MENUS)?.map((items) => ({
                    key: items.IDMENU,
                    label: <Link to={items.LINKS}>{items.TENMENU}</Link>,
                  }))
                : "",
            }))}
          />
        </Sider>
      </ConfigProvider>
      <Layout
        style={{
          marginLeft: !collapsed ? 200 : 80,
          transition: "all .3s",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex justify-between ">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="px-5 ">
              <div className="flex justify-between items-center ">
                <ul className=" flex justify-center gap-4  items-center">
                  <li className="w-10">
                    <ButtonLang />
                  </li>
                  <li>
                    <Notification />
                  </li>
                  <li>
                    <Avatars />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            boxShadow:
              "0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15)",
            margin: "5px 5px",
            minHeight: 870,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {props.children}
        </Content>
      </Layout>
      {/* <Reponsive /> */}
    </Layout>
    // <>
    //     <Sidenav  children = {props.children}/>
    // </>
  );
};

export default LayoutApp;
