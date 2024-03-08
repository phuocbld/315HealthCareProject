import React, { useState } from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import style from "./style.module.css"
import { useTranslation } from "react-i18next";
import i18n from "i18next";
const ButtonLang = () => {
  const [open, setOpen] = React.useState(false);
  const [flag, setFlag] = useState("flag-vietnamese.png");
  const { t } = useTranslation("translation");
  const anchorRef = React.useRef(null);
  //data ngôn ngữ cần thay đổi
  const data = [
    {
      title: "Vietnamese",
      img: "flag-vietnamese.png",
      language:'vie'
    },
    {
      title: "English",
      img: "flag-english.png",
      language:'eng'
    },
    {
      title: "Chinese",
      img: "flag-china.png",
      language:'chi'
    },
  ];
  // hiện select chọn ngôn ngữ
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // xử lý và  close select
  const handleClose =  (event, item) => {
  setFlag(item?.img);
    // thay đổi nôn ngữ
    i18n.changeLanguage(item?.language);
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };


  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <>
      <Button
      className={style.button}
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >

        <p className="text-white normal-case text-base ">{t('Ngôn ngữ')}</p>
        <img className="w-7" src={"images/flag/" + flag} alt={flag} />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={()=>{setOpen(false)}}>
                <MenuList
                className="w-36"
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                //   onKeyDown={handleListKeyDown}
                >
                  {data?.map((items) => (
                    <MenuItem
                      key={items.title}
                      onClick={(e) => {
                        handleClose(e, items);
                      }}
                    >
                      {items.title}
                      <img
                        className="w-6 ml-1"
                        src={"images/flag/" + items.img}
                        alt={items.flag}
                      />
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default ButtonLang;
