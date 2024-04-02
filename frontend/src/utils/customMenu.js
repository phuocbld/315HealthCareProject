import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
// nhận vào 1 mãng dữ liệu
// thêm các icon và chuyển mảng child nhận từ json sang  obj

const convertJSONToOject = (json) => { // chuyển về dạng object
  return JSON.parse(json)
}

export const customMenu = (menu) => {
  const newMenu = [];
  menu?.map((items) => {
    switch (items.idMenu) {
      case 1:
        newMenu.push({
            label: items.tenMenu,
            icon: <DisplaySettingsIcon />,
            child : convertJSONToOject(items.chilD_MENUS)
        });
        break;
      default:
        break;
    }
  });
  return newMenu
};
