import React, { useState } from "react";
import * as typeAction from "../../../../store/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
const ModalAdd = () => {
  const dispatch = useDispatch();
  const { modalAddKhamDoan } = useSelector((state) => state.modalReducer);
  const handleOk = () => {
    dispatch({
      type: typeAction.CLOSE_ADD_KHAM_DOAN,
    });
  };

  const handleCancel = () => {
    dispatch({
      type: typeAction.CLOSE_ADD_KHAM_DOAN,
    });
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={modalAddKhamDoan}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ModalAdd;
