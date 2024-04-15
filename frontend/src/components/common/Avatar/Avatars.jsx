import React, { useEffect } from 'react'
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../store/actions/userAction';
import * as typeACtion from '../../../store/constants/constants'
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));
const Avatars = ( {info}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const {infoUser} = useSelector(state => state.userReducer)
  const infoUser = JSON.parse(localStorage.getItem('USER_INFO'))
  const open = Boolean(anchorEl);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const logout = () =>{
    dispatch(logoutUser(navigate))
  }
  const DongCaLamViec = () => {
    handleClose()
    dispatch({
      type: typeACtion.OPEN_MODAL_MOCA,
    });
  };
const stringName = (name) => {
  if(name){
    const nameString = name.split('')[0][0]+name.split('')[1][0]
  return nameString.toUpperCase()
  }else{
    return ''
  }
  
}

  return (
    <>
        <Tooltip title="Thiết lập tài khoản" style={{borderRadius:0}}>
          <IconButton
            onClick={handleClick}
            size="small"
            // sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{bgcolor:'white',color:'#3b82f6', border:'1px solid #3b82f6'}} children={stringName(infoUser?.tenNV)}/>
            <div className='text-start flex  ml-2 justify-center  text-black  text-sm'>
              <p >{infoUser?.tenNV}</p>
              <span > - {infoUser?.tenNhom}</span>
            </div>
          </IconButton>
        </Tooltip>
        <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <EditIcon />
          Hồ sơ
        </MenuItem>
        <MenuItem onClick={DongCaLamViec} disableRipple>
          <FileCopyIcon />
          Đóng ca
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={logout} disableRipple>
          <ExitToAppIcon />
          Đăng xuất
        </MenuItem>
      </StyledMenu>
    </>
  )
}

export default Avatars