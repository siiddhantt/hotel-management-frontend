import React from "react";

import API_Service from "../api/service";

function Cancel({ data, refund, onClose, handleUpdateData }) {
  const handleConfirm = async () => {
    await API_Service.deleteBooking({ id: data.id });
    handleUpdateData();
    onClose();
  };
  return (
    <div className="modal-dialog modal-confirm">
      <div className="modal-content">
        <div className="modal-header flex-column">
          <div className="icon-box">
            <i className="material-icons">&#xE5CD;</i>
          </div>
          <h4 className="modal-title w-100">Are you sure?</h4>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-hidden="true"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="modal-body-1" style={{ marginTop: "20px" }}>
          <div>Booking ID: {data.id}</div>
          <div>Room Number: {data.room_id}</div>
          <div>Email: {data.user_email}</div>
          <div>Amount Paid: {data.amount}</div>
          <div>Refund Amount: {refund}</div>
        </div>
        <div className="modal-footer justify-content-center">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cancel;
