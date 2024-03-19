import { Formik } from "formik";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import { loginSchema } from "../../../schemas/loginSchema";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/actions/userAction";
import { useNavigate } from "react-router-dom";
const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation("translation");
  const {listBranch} = useSelector (state => state.branchReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = (values, action) => {
    action.resetForm()
    // Xử lí đăng nhập
    dispatch(loginUser(values,navigate))
    console.log(values);
  };
  // xử lý selelect chọn phòng khám
  const handleSelect = (event, props) => {
    let value = event.target.value;
    props.setFieldValue("idChiNhanh", value); // setFieldValue maPhongKham vào >>>> form formik
  };

  // show password
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        idChiNhanh: "",
      }}
      onSubmit={handleLogin}
      validationSchema={loginSchema}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          {/* các field của form */}
          <Box
            className="flex flex-col gap-4"
            sx={{
              width: "100%",
            }}
          >
            <FormControl className="w-full" variant="outlined">
              <TextField
                id="outlined-multiline-flexible"
                label= {t("Tên tài khoản")}
                className="w-full "
                size="small"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.username}
                name="username"
                maxRows={4}
              />
              {props.touched.username && props.errors.username && <span className="text-left text-red-500">* {t(props.errors.username)}</span> }
              
            </FormControl>

            <FormControl className="w-full" size="small" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
              {t("Mật khẩu")}
              </InputLabel>
              <OutlinedInput
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                name="password"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {props.touched.password && props.errors.password && <span className="text-left text-red-500">* {t(props.errors.password)}</span> }
            </FormControl>
            <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel id="demo-select-small-label">
              {t("Chọn phòng khám")}
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                value={props.values.idChiNhanh}
                id="demo-select-small"
                label={t("Chọn phòng khám")}
                name="idChiNhanh"
                MenuProps={{style:{maxHeight:300}}}
                onChange={(e) => {
                  handleSelect(e, props);
                }}
              >
                {listBranch?.map((items) => (<MenuItem key={items.idChiNhanh} value={items.idChiNhanh}>
                  {items.tenChiNhanh}
                </MenuItem>))}
                {/* <MenuItem value={"PS_HD"}>Phụ sản - Hoàng Diệu</MenuItem>
                <MenuItem value={"VP_HVT"}>VP - 207b Hoàng Văn Thụ</MenuItem>
                <MenuItem value={"ND_QT"}>Nhi - Quang Trung</MenuItem> */}
              </Select>
              {props.touched.idChiNhanh && props.errors.idChiNhanh && <span className="text-left text-red-500">* {t(props.errors.idChiNhanh)}</span> }
            </FormControl>
            <Box>
              <p className="p-3 text-blue-500 cursor-pointer">
                {t("Quên mật khẩu")} ?
              </p>
              <Button type="submit" className="w-full" variant="contained">
                {t("Đăng nhập")}
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default FormLogin;
