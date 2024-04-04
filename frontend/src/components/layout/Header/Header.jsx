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


const Header = ({ open, handleDrawer }) => {
  const [isActive, setIsActive] = useState(null);
  //xử lí click Navbar
  const { infoUser } = useSelector((state) => state.userReducer);
  const hanldClick = (label) => {
    setIsActive(label);
  };

  return (
    <header
      className=" relative h-14  border border-transparent bg-white text-[#00ADEF] border-b-gray-300 "
    >
      <div className=" fixed box-border w-full  px-5 ">
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
