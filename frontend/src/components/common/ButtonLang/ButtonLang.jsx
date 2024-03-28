import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import style from './style.module.css'
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import flagEnghlish from '../../../assets/images/flag/flag-english.png'
import flagVietnamese from '../../../assets/images/flag/flag-vietnamese.png'

const ButtonLang = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [flag, setFlag] = useState(flagVietnamese)
  const open = Boolean(anchorEl);
  
  const { t } = useTranslation("translation");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 const handleChoose = (value,label) =>{
  i18n.changeLanguage(value);
  handleClose()
  if(value === 'vie'){
    setFlag(flagVietnamese)
  }else{
    setFlag(flagEnghlish)
  }
 }
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={style.button}
      >
        <img className="w-6 h-6" src={flag} alt={flag} />
        <span className="text-white">{t(props.label)}</span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        open={anchorEl}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        className="mt-4"
      >
        {[
          { label: "Vietnamese", value: "vie" },
          { label: "English", value: "eng" },
        ].map((items) => (
          <MenuItem key={items.value} onClick={()=>{handleChoose(items.value,items.label)} }>
            <img className="w-6 h-6" src={items.value === 'vie' ? flagVietnamese : flagEnghlish} alt={items.value} />
            <span className="px-2">{items.label}</span>
          </MenuItem>
        ))} 
      </Menu>
    </div>
  );
};

export default ButtonLang;
