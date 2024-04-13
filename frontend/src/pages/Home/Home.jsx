import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  demoModalCAction,
  infoBranchLogin,
} from "../../store/actions/BranchAction";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LayoutApp from "../../HOCs/LayoutApp";
import Dashboard from "../../components/layout/Dashboard/Dashboard";
import logoNhi from "../../assets/images/logo/MemLogo_315_Logo.png";
import logoSan from "../../assets/images/logo/logo_phuSan.jpg";
import logoMat from "../../assets/images/logo/Logo_mat.png";
import logoLao from "../../assets/images/logo/logo_laoKhoa.png";
const Home = () => {
  const dispatch = useDispatch();
  const { infoUser } = useSelector((state) => state.userReducer);
  const { PkDangNhap } = useSelector((state) => state.branchReducer);
  const idBranch = localStorage.getItem("BRANH_LOGIN");
  useEffect(() => {
dispatch(infoBranchLogin(idBranch))
  }, []);
  return (
    <LayoutApp>
      {infoUser?.tenNhom === "Ban Giám đốc" ? (
        <Dashboard />
      ) : (
        <div className="h-full relative bg-cyan-50">
          <div className=" flex flex-col w-full justify-center items-center absolute top-52 ">
            <div className="flex justify-center items-center">
              <img
              className="h-40"
                src={PkDangNhap?.chuyenKhoa == "NHI" ? logoNhi : ""}
                alt="logo"
              />
              <h2 className="text-[#00AFEF] text-3xl font-semibold">
                HỆ THỐNG Y TẾ VÀ BỆNH VIỆN 315
              </h2>
            </div>
            <div className="text-[#00AFEF]  text-center -translate-y-4">
              <h2 className="font-semibold text-3xl">
                Chi nhánh {PkDangNhap?.tenChiNhanh}
              </h2>
              <div className="text-lg font-medium">
                <p>
                  <FmdGoodIcon /> {PkDangNhap?.diaChi}{" "}
                </p>
                <p>
                  <LocalPhoneIcon /> 0901.315.315{" "}
                  {PkDangNhap?.dienThoai &&
                    `- <LocalPhoneIcon/> ${PkDangNhap?.dienThoai} `}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </LayoutApp>
  );
};

export default Home;
