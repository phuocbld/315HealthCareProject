import React, { useState } from "react";
import { Button, Popover, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
const content = (
  <List>
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon></ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon></ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton>
    </ListItem>
  </List>
);
const DropDown = () => {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  return (
    <>
      <Popover
        open={open}
        content={
          <List>
            <ListItem onClick={hide} disablePadding>
              <ListItemButton sx={{
                paddingX:1
              }} >
                <ListItemText sx={{margin:0}} primary={<span className="text-[14px]">Hoàn phí</span>} />
              </ListItemButton>
            </ListItem>
            <ListItem onClick={hide} disablePadding>
              <ListItemButton sx={{
                paddingX:1
              }} >
                <ListItemText sx={{margin:0}} primary={<span className="text-[14px]">Không khám bệnh</span>} />
              </ListItemButton>
            </ListItem>
          </List>
        }
        title="Tuỳ chọn"
        placement="right"
        trigger="click"
        onOpenChange={handleOpenChange}
      >
        <MoreOutlined className="font-medium text-base" />
      </Popover>
    </>
  );
};

export default DropDown;
