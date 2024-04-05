import Branch from "../components/layout/Branch/Branch";
import ChuyenKho from "../components/layout/ChuyenKho/ChuyenKho";
import Dashboard from "../components/layout/Dashboard/Dashboard";
import Receive from "../components/layout/Receive/Receive";
import Staff from "../components/layout/Staff/Staff";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Nhapkho from "../components/layout/NhapKho/Nhapkho";
import ThuaMua from "../components/layout/ThuMua/ThuaMua";
import TraCuu from "../components/layout/TraCuu/TraCuu";
import KhachKhamDoan from "../components/layout/KhachKhamDoan/KhachKhamDoan";

//Tạo các route
export const routes = [ 
    {path:"/", Component: Home, isAuth: true, redirectPath: '/login' },
    {path:'/login', Component: Login },
    {path:'/nhan-vien',Component: Staff, isAuth: true, redirectPath: '/login'},
    {path:'/chi-nhanh',Component: Branch, isAuth: true, redirectPath: '/login'},
    {path:'/Tiepnhan/Tiepnhanbenh',Component: Receive, isAuth: true, redirectPath: '/login'},
    {path:'/Dashboard',Component: Dashboard, isAuth: true, redirectPath: '/login'},
    {path:'/thumuakho/chuyenkho',Component: ChuyenKho, isAuth: true, redirectPath: '/login'},
    {path:'/thumuakho/nhapkho',Component: Nhapkho, isAuth: true, redirectPath: '/login'},
    {path:'/thumuakho/thuoc',Component: ThuaMua, isAuth: true, redirectPath: '/login'},
    {path:'/traCuu',Component: TraCuu,  redirectPath: '/login'},
    {path:'/Khachkhamdoan/Khachkham',Component: KhachKhamDoan, isAuth: true, redirectPath: '/login'},

]