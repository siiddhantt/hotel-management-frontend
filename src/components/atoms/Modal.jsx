import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Alert, TextField, Button } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import API_Service from "../../api/service";

function Modal({ openPopUp, closePopUp, initialData }) {
  const [roomNumber, setRoomNumber] = useState(initialData.roomNumber || "");
  const [userEmail, setUserEmail] = useState(initialData.userEmail || "");
  const [startTime, setStartTime] = useState(initialData.startTime || "");
  const [endTime, setEndTime] = useState(initialData.endTime || "");
  const [price, setPrice] = useState(0);
  const priceCalculate = async () => {
    const response = await API_Service.getPrice({
      room_id: roomNumber,
    });
    console.log(response);
    if (response.data.length > 0)
      setPrice(
        Math.max(
          response.data[0].hourly_rate *
            ((endTime - startTime) / 3600).toFixed(2),
          0
        )
      );
  };
  useEffect(() => {
    priceCalculate();
  }, [roomNumber, startTime, endTime]);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const handlelosePopUp = (e) => {
    if (e.target.id === "ModelContainer") closePopUp();
  };
  if (openPopUp !== true) return null;
  const handleCreate = async () => {
    const response = await API_Service.createBooking({
      room_id: roomNumber,
      user_email: userEmail,
      start_time: startTime,
      end_time: endTime,
      amount: price,
    });
    console.log(response.data);
    response.data.isValid ? setAlertSuccess(true) : setAlertError(true);
  };
  return (
    <div id="ModelContainer" onClick={handlelosePopUp} className="modal">
      
    </div>
  );
}

export default Modal;
