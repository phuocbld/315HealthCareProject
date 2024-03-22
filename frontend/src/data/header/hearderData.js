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
export const Navbar = [
  {
    label: "Hệ thống",
    icon: <DisplaySettingsIcon />,
    child: [
      {
        label: "Nhân viên",
        path: "/nhan-vien",
      },
      {
        label: "Vai trò người dung",
        path: "/vai-tro-nguoi-dung",
      },
      {
        label: "Người dùng",
        path: "/nguoi-dung",
      },
      {
        label: "Chức danh",
        path: "/chuc-danh",
      },
      {
        label: "Menu",
        path: "/menu",
      },
      {
        label: "Đăng nhập",
        path: "/dang-nhap",
      },
    ],
  },
  {
    label: "Khách hàng",
    icon: <GroupIcon />,
  },
  {
    label: "Tiếp nhận",
    icon: <MarkunreadMailboxIcon />,
    child: [
      {
        label:'Nhận bệnh',
        path:'/nhan-benh'
      }
    ]
  },
  {
    label: "phòng khám",
    icon: <WarehouseIcon />,
  },
  {
    label: "Thu mua - Kho",
    icon: <StorefrontIcon />,
  },
  {
    label: "Cận lâm sàn",
    icon: <AddModeratorIcon />,
  },
  {
    label: "Nhà thuốc",
    icon: <MedicationIcon />,
  },
  {
    label: "Tiêm chủng",
    icon: <VaccinesIcon />,
  },
  {
    label: "Thẻ thành viên",
    icon: <AddCardIcon />,
  },
  {
    label: "Tra cứu",
    icon: <ContentPasteSearchIcon />,
  },

  {
    label: "Báo cáo",
    icon: <LineAxisIcon />,
  },

  {
    label: "Danh mục",
    icon: <CategoryIcon />,
    child: [
      {
        label: "Chi nhánh",
        path:'/chi-nhanh'
      },
      {
        label: "Công ty",
      },
    ],
  },

  {
    label: "Tiện ích",
    icon: <AutoAwesomeIcon />,
  },
  {
    label: "Trợ giúp",
    icon: <SupportAgentIcon />,
  },
];
