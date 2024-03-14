import React, { useState } from "react";
import { Narbar } from "../../../data/header/hearderData";
const className_isActive = " text-blue-500 border-b-2 border-blue-500";
const className_btn = "text-black  text-center  px-2 py-4  font-medium hover:bg-sky-100 duration-300 cursor-pointer";

const Header = () => {
  const [isActive, setIsActive] = useState(null);
  //xử lí click Navbar
  const hanldClick = (label) => {
    setIsActive(label);
  };
  return (
    <header className=" bg-[#fbfcfe]  border border-transparent border-b-gray-300 ">
      <div className="flex">
        <nav className="" >
          <ul className="flex gap-2 h-full ">
            <li className="py-2">
            <h2 className="bg-blue-500 font-medium text-white rounded-full text-base p-2">
          315
        </h2>
            </li>
            {Narbar?.map((items) => (
              <li
              onClick={()=>{hanldClick(items.label)}}
              key={items.label}
              className={isActive === items.label ? className_btn + className_isActive : className_btn  }
              >
                {items.label}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div></div>
    </header>
  );
};

export default Header;
