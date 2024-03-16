import * as React from 'react';
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Divider from '@mui/material/Divider';
const Notification = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Badge onClick={handleClick} badgeContent={2} className="cursor-pointer hover:scale-110 duration-300" color="error" >
        <MailIcon className="text-blue-50" />
      </Badge>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        className='mt-4 w-[400px]'
      >
         <List sx={{ width: 360, height: 400 ,bgcolor: 'background.paper' }}>
        <MenuItem onClick={handleClose}>
          <ListItem>
        <ListItemText primary="Thuốc hết hạn" secondary="mã hàng: KM0016 - kẹo mút vị yaout" />
      </ListItem> 
        </MenuItem>
        <Divider variant="inset" component="li" />
        <MenuItem onClick={handleClose}>
          <ListItem>
        <ListItemText primary="Yêu cầu đổi mật khẩu" secondary="mã NV: NV00023 - Nguyễn Quốc Tài" />
      </ListItem> 
        </MenuItem>
        <Divider variant="inset" component="li" />
        </List>
      </Menu>
    </>
  );
};

export default Notification;
