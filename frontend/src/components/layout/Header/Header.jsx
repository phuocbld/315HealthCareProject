import React, { useState } from "react";
import { Narbar } from "../../../data/header/hearderData";
import Avatars from "../../common/Avatar/Avatars";
import ButtonLang from '../../common/ButtonLang/ButtonLang';
import Notification from '../../common/Notificaton/Notification'
import { useSelector } from "react-redux";
const className_isActive = " text-blue-500 border-b-2 border-blue-500";
const className_btn =
  "text-black text-center px-2 py-4 font-medium hover:bg-sky-100 duration-300 cursor-pointer";

const Header = () => {
  const [isActive, setIsActive] = useState(null);
  //xử lí click Navbar
  const {infoUser} = useSelector(state => state.userReducer)
  const hanldClick = (label) => {
    setIsActive(label);
  };
  return (
    <header className="fixed w-full top-0 z-50 bg-[#00ADEF]  border border-transparent px-4 border-b-gray-300 ">
      <div className="flex justify-between ">
        <ul className="flex gap-2 h-full ">
          <li className="py-2 flex items-center">
            <img className="w-14 h-14" src="https://static.ladipage.net/5aa6273ea81f66ca2eacc40b/z3224820945183_a275c59effa3fe08b33cefff65cf4844-20220315094641.png" alt="nhi đồng 315" />
            <h2 className="font-medium text-white text-base p-2">
            Hệ Thống  315
            </h2>
          </li>
        </ul>
        <ul className=" flex justify-center gap-4  items-center">
          <li className="w-10"><ButtonLang label = ''/></li>
          <li><Notification/></li>
          <li><Avatars info={infoUser} /></li>
        </ul>
      </div>
      <div></div>
    </header>
  );
};

export default Header;
