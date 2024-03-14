import React from "react";
import Stack from '@mui/material/Stack';
import { NavLink } from "react-router-dom";
const className_isActive = 'bg-slate-300'
const className_btn = 'text-black'
const narbar = [{
  label:'Hệ thống',
  to:'/he-thong'
}]
const Header = () => {

  return (
    <header className=" p-2 bg-[#fbfcfe] border border-transparent border-b-gray-300 ">
      <div className="flex">
        <h2 className="bg-blue-500 font-medium text-white rounded-full text-base p-2">
          315
        </h2>
        <Stack direction="row" className="text-white">
        {narbar?.map(items => <button>
          <NavLink to={items.to} className={({isActive}) => 
        isActive ? className_isActive:  className_btn
        }>
        {items.label}
          </NavLink>
        </button>)}
        </Stack>
      </div>
      <div></div>
    </header>
  );
};

export default Header;
