import React, { useEffect } from "react";
import Layout from "../../../HOCs/Layout";
import { Input, Tabs, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllSelectClinicAction, getQuanAction, getXaAction } from "../../../store/actions/receiveAction";

const Receive = () => {
  const dispatch = useDispatch();
  const {
    nguonKH,
    phongKham,
    ngheNghiep,
    hinhThucTT,
    danToc,
    doiTuong,
    tinhTP,
    quocTich,
    phuongXa,
    quanHuyen,
  } = useSelector((state) => state.receiveReducer);

  const handleTinh = (value) =>{
    dispatch(getQuanAction(value))
  }
  const handleXaPhuong = (value) => {
    dispatch(getXaAction(value))
  }
  useEffect(() => {
    dispatch(getAllSelectClinicAction());
  }, []);
  return (
    <Layout>
      <div>
        <div
          className="bg-white m-5 p-5 rounded-lg "
          style={{
            border: "1px solid #B6BBC4",
            boxShadow:
              "0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15)",
          }}
        >
          <form className="flex" action="">
            <div className="w-1/2 border p-2 rounded-lg h-[400px]">
              <Tabs
                type="card"
                items={[
                  {
                    label: "Thông tin bệnh nhân",
                    key: 1,
                    children: (
                      <>
                      <div className="flex flex-col gap-2">
                      <div className="flex gap-5">
                          <div className="flex w-2/5 items-center">
                            <label className="w-1/3">Họ và tên:</label>
                            <Input size="small" />
                          </div>
                          <div className="flex w-3/5 items-center">
                            <label className="w-[15.5%]">Mã BN:</label>
                            <Input size="small" />
                          </div>
                        </div>
                        <div className="flex gap-5">
                          <div className="flex w-2/5 items-center">
                            <label className="w-1/3">Điện thoại:</label>
                            <Input size="small" />
                          </div>
                          <div className="flex w-3/5 gap-5 items-center">
                            <div className="flex w-1/2">
                              <label className="w-2/5">Giới tính:</label>
                              <Select
                                className="w-full"
                                options={[
                                  { label: "Nam", value: "Nam" },
                                  { label: "Nữ", value: "Nữ" },
                                  { label: "Khác", value: "Khác" },
                                ]}
                                size="small"
                              />
                            </div>
                            <div className="flex w-1/2">
                              <label className="w-3/5">Ngày sinh:</label>
                              <Input size="small" />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-5">
                          <div className="flex w-2/5 items-center">
                            <label className="w-1/3">Loại khám:</label>
                            <Input size="small" />
                          </div>
                          <div className="flex w-3/5 gap-5 items-center">
                            <div className="flex w-1/2">
                              <label className="w-2/5">Dân tộc:</label>
                              <Select
                                options={danToc?.map((items) => ({
                                  label: items.tenDanToc,
                                  value: items.tenDanToc,
                                }))}
                                className="w-full"
                                size="small"
                              />
                            </div>
                            <div className="flex w-1/2">
                              <label className="w-3/5">Tuổi:</label>
                              <Input size="small" />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-5">
                          <div className="flex w-2/5 items-center">
                            <label className="w-1/3">Tình trạng:</label>
                            <Input size="small" />
                          </div>
                          <div className="flex w-3/5 gap-5 items-center">
                            <div className="flex w-1/2">
                              <label className="w-2/5">Nguồn:</label>
                              <Select
                                options={nguonKH?.map((items) => ({
                                  value: items.idNguonKH,
                                  label: items.nguon,
                                }))}
                                className="w-full"
                                size="small"
                              />
                            </div>
                            <div className="flex w-1/2">
                              <label className="w-[43%]">Quốc tịch:</label>
                              <Select
                                options={quocTich?.map((items) => ({
                                  label: items.tenQuocTich,
                                  value: items.idQuocTich,
                                }))}
                                className="w-3/4"
                                size="small"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-5">
                          <div className="flex w-1/2 items-center">
                            <label className="w-1/4">Đối tượng:</label>
                            <Select
                              options={doiTuong?.map((items) => ({
                                label: items.tenDoiTuong,
                                value: items.idDOiTuong,
                              }))}
                              className="w-full"
                              size="small"
                            />
                          </div>
                          <div className="flex gap-1 w-1/2 ">
                            <label className="w-1/3">Nghề nghiệp:</label>
                            <Select
                              options={ngheNghiep?.map((items) => ({
                                value: items.idNN,
                                label: items.tenNN,
                              }))}
                              className="w-full"
                              size="small"
                            />
                          </div>
                        </div>
                        <div className="flex gap-5">
                          <div className="flex w-1/2 items-center">
                            <label className="w-1/4">Mã TCQG:</label>
                            <Input size="small" />
                          </div>
                          <div className="flex gap-1 w-1/2 ">
                            <label className="w-1/3">Phòng khám:</label>
                            <Select
                              className="w-full"
                              options={phongKham?.map((items) => ({
                                value: items.maPK,
                                label: items.tenPK,
                              }))}
                              size="small"
                            />
                          </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="flex gap-1 w-1/3 ">
                              <label className="w-[42%]">Tỉnh/TP:</label>
                              <Select
                              onChange={handleTinh}
                                options={tinhTP?.map((item) => ({
                                  label: item.tenTinh,
                                  value: item.idTinh,
                                }))}
                                className="w-full"
                                size="small"
                              />
                            </div>
                            <div className="flex gap-1 w-1/3 ">
                              <label >Q.Huyện:</label>
                              <Select
                              onChange={handleTinh}
                                options={quanHuyen?.map((item) => ({
                                  label: item.tenQuan,
                                  value: item.idQuan,
                                }))}
                                className="w-full"
                                size="small"
                              />
                            </div>
                            <div className="flex gap-1 w-1/3 ">
                              <label >X.Phường:</label>
                              <Select
                              onChange={handleTinh}
                                options={phuongXa?.map((item) => ({
                                  label: item.tenPhuong,
                                  value: item.idPhuong,
                                }))}
                                className="w-full"
                                size="small"
                              />
                            </div>

                        </div>
                        <div className="flex ">
                            <label className="w-[11%]">Địa chỉ:</label>
                            <Input size="small" />
                          </div>
                        <div className="flex gap-2 mt-3">
                          <div className="flex w-full gap-4 items-center">
                            <label className="w-[9%]">Ghi Chú</label>
                            <Input.TextArea />
                          </div>
                        </div>
                      </div>
                       
                      </>
                    ),
                  },
                  {
                    label: "Chỉ số bệnh nhân",
                    key: 2,
                    children: (
                      <>
                        <div className="flex gap-5">
                          <div className="w-1/2 flex flex-col gap-5">
                            <div>
                              <label>SpO2:</label>
                              <Input addonAfter="%" />
                            </div>
                            <div>
                              <label>Huyết áp:</label>
                              <Input addonAfter="mmHg" />
                            </div>
                            <div>
                              <label>Nhiệp thở:</label>
                              <Input addonAfter="Lần/p" />
                            </div>
                          </div>
                          <div className="w-1/2 flex flex-col gap-5">
                            <div>
                              <label>Cân nặng:</label>
                              <Input addonAfter="kg" />
                            </div>
                            <div>
                              <label>Chiều cao:</label>
                              <Input addonAfter="Cm" />
                            </div>
                            <div>
                              <label>Nhiệt độ:</label>
                              <Input addonAfter="C" />
                            </div>
                          </div>
                        </div>
                      </>
                    ),
                  },
                ]}
              />
            </div>

            <div className="w-1/2"></div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Receive;
