import Branch from "../components/layout/Branch/Branch";
import Receive from "../components/layout/Receive/Receive";
import Staff from "../components/layout/Staff/Staff";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";


//Tạo các route
export const routes = [ 
    {path:"/", Component: Home, isAuth: true, redirectPath: '/login' },
    {path:'/login', Component: Login },
    {path:'/nhan-vien',Component: Staff, isAuth: true, redirectPath: '/login'},
    {path:'/chi-nhanh',Component: Branch, isAuth: true, redirectPath: '/login'},
    {path:'/nhan-benh',Component: Receive, isAuth: true, redirectPath: '/login'},
]