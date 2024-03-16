import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";


//Tạo các route
export const routes = [ 
    {path:"/", Component: Home},
    {path:'/login', Component: Login}
]