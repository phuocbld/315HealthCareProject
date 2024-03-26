import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import GroupIcon from "@mui/icons-material/Group";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import MedicationIcon from "@mui/icons-material/Medication";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import AddCardIcon from "@mui/icons-material/AddCard";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import CategoryIcon from "@mui/icons-material/Category";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
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
