import React, { useState } from "react";
import { Narbar } from "../../../data/header/hearderData";
import Avatars from "../../common/Avatar/Avatars";
import ButtonLang from "../../common/ButtonLang/ButtonLang";
import Notification from "../../common/Notificaton/Notification";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import * as typeACtion from "../../../store/constants/constants";
const className_isActive = " text-blue-500 border-b-2 border-blue-500";
const className_btn =
  "text-black text-center px-2 py-4 font-medium hover:bg-sky-100 duration-300 cursor-pointer";

const Header = ({ open, handleDrawer }) => {
  const [isActive, setIsActive] = useState(null);
  //xử lí click Navbar
  const { infoUser } = useSelector((state) => state.userReducer);
  const hanldClick = (label) => {
    setIsActive(label);
  };

  return (
    <header
      style={{ paddingLeft: open ? 250 : 65 }}
      className="fixed right-0 duration-300 top-0 w-full z-50  border border-transparent bg-white text-[#00ADEF] border-b-gray-300 "
    >
      <div className="p-1">
        <div className="flex justify-between items-center ">
          <IconButton onClick={handleDrawer}>
            {open ? (
              <ClearAllIcon className="text-[#00ADEF]" />
            ) : (
              <ArrowForwardIcon className="text-[#00ADEF]" />
            )}
          </IconButton>

          <ul className=" flex justify-center gap-4  items-center">
            <li className="w-10">
              <ButtonLang />
            </li>
            <li>
              <Notification />
            </li>
            <li>
              <Avatars info={infoUser} />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
