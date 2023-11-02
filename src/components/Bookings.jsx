import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import Modal from "./Modal";
import Cancel from "./Cancel";
import API_Service from "../api/service";

function Bookings() {
  const [bookData, setBookData] = useState([]);
  const [cancelData, setCancelData] = useState([]);
  const [refund, setRefund] = useState(0.0);
  const convert = (epoch) => {
    const dateTime = new Date(epoch * 1000).toLocaleString();
    return dateTime;
  };
  const handleCancel = async (data) => {
    setCancelData(data);
    const timediff = data.start_time - Math.floor(Date.now() / 1000);
    if (timediff > 172800) setRefund(data.amount);
    else if (timediff >= 86400 && timediff <= 172800)
      setRefund(data.amount * 0.5);
    else setRefund(0.0);
    setOpenPopup(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await API_Service.getBookings();
      setBookData(response.data.data);
      console.log(response.data.data);
    };
    fetchData();
  }, []);
  const [openPopup, setOpenPopup] = useState(false);
  const handleRemovePopUp = () => setOpenPopup(false);
  return (
    <div className="bookings">
      {bookData.map((value, index) => {
        return (
          <div key={index} className="booking">
            <div>{value.room_id}</div>
            <div>{value.user_email}</div>
            <div>{convert(value.start_time)}</div>
            <div>{convert(value.end_time)}</div>
            <Button variant="outlined" startIcon={<EditRoundedIcon />}>
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleCancel(value)}
            >
              Cancel
            </Button>
          </div>
        );
      })}
      <Modal
        openPopUp={openPopup}
        closePopUp={handleRemovePopUp}
        child={<Cancel data={cancelData} refund={refund} />}
      />
    </div>
  );
}

export default Bookings;
