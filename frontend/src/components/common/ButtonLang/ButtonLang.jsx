import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import style from './style.module.css'
const ButtonLang = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [flag, setFlag] = useState('flag-vietnamese.png')
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleChoose = (value) => {
    setAnchorEl(null);

  };

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
        <img className="w-6 h-6" src={'images/flag/' + flag} alt="" />
        <span className="text-white">{props.label}</span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        onClose={handleChoose}
        open={open}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        className="mt-4"
      >
        {[
          { label: "Vietnamese", value: "vie" },
          { label: "English", value: "eng" },
          { label: "Chinese", value: "chi" },
        ].map((items) => (
          <MenuItem key={items.value} onClick={()=> handleChoose(items.value)}>
            <img className="w-6 h-6" src={'images/flag/flag-'+items.label+'.png'} alt={items.value} />
            <span className="px-2">{items.label}</span>
          </MenuItem>
        ))}
        
      </Menu>
    </div>
  );
};

export default ButtonLang;
