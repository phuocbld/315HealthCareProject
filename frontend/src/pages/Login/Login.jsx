import React from "react";
import FormLogin from "./FormLogin/FormLogin";
import style from "./login.module.css";
import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";
import ButtonLang from "../../components/common/ButtonLang/ButtonLang";
const Login = () => {
  const { t } = useTranslation("translation");

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-500 to-sky-500 h-screen flex ">
        <div className="w-1/2  flex  items-center justify-start">
          <div className="w-full mx-40 text-white">
            <motion.h2
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
              }}
              className="  text-[36px] font-medium"
            >
              Welcome to
            </motion.h2>
            <motion.span
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: -30, opacity: 1 }}
              transition={{
                duration: 0.6,
              }}
              className="text-[72px]  font-semibold absolute "
            >
              315 medic
            </motion.span>
            <ul className="mt-[120px]">
              <motion.li
                initial={{ x: -150, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                }}
                className="flex text-center items-center bg-blue-950 gap-2 rounded-r-3xl rounded-tl-3xl p-2"
              >
                <span className="text-black bg-white rounded-full font-medium w-[40px] h-[40px] leading-[40px] ">
                  315
                </span>
                <p>{t("Quảng lý phòng khám và bệnh viện")}</p>
              </motion.li>
              <motion.li
                initial={{ x: -150, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                }}
                className="flex text-center items-center mt-4 bg-blue-950 gap-2 rounded-r-3xl rounded-tl-3xl p-2"
              >
                <span className="text-black bg-white rounded-full font-medium w-[40px] h-[40px] leading-[40px] ">
                  315
                </span>
                <p>{t("Quản lý thông tin khách hàng")}</p>
              </motion.li>
            </ul>
          </div>
        </div>
        <div className={style.container_right}>
          <div className=" absolute top-10 right-10 ">
            <ButtonLang />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
            }}
            className="flex flex-col bg-[rgb(255,255,255,0.85)]  ml-20 text-center rounded-xl w-[450px]  p-7"
            style={{
              border: "unset",
              boxShadow: "0px 0px 14px 1px rgba(255,255,255,0.6)",
            }}
          >
            <h2 className="font-medium text-2xl mb-10">{t("Đăng nhập")}</h2>
            <FormLogin />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;
