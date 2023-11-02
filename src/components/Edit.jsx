import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Alert, TextField, Button } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import API_Service from "../api/service";

function Edit({ initialData }) {
  const [roomNumber, setRoomNumber] = useState(initialData.room_id);
  const [userEmail, setUserEmail] = useState(initialData.user_email);
  const [startTime, setStartTime] = useState(initialData.start_time);
  const [endTime, setEndTime] = useState(initialData.end_time);
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
  const handleEdit = async () => {
    console.log(dayjs(startTime * 1000), dayjs(endTime * 1000));
    const response = await API_Service.updateBooking({
      id: initialData.id,
      room_id: roomNumber,
      user_email: userEmail,
      start_time: startTime,
      end_time: endTime,
      amount: price,
    });
    setAlertSuccess(true);
    setTimeout(() => {
      setAlertSuccess(false);
      setAlertError(false);
    }, 3000);
  };
  return (
    <div className="modal-body">
      <div className="form-body">
        <div style={{ color: "black" }}>Edit booking</div>
        <TextField
          id="outlined-basic"
          label="Room number"
          variant="outlined"
          value={roomNumber}
          fullWidth={true}
          onChange={(e) => {
            setRoomNumber(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={userEmail}
          fullWidth={true}
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
        <div style={{ display: "flex", gap: 5 }}>
          <DateTimePicker
            label="Start time"
            defaultValue={dayjs(initialData.start_time * 1000)}
            onChange={(value) => setStartTime(parseInt(value.unix()))}
          />
          <DateTimePicker
            label="End time"
            defaultValue={dayjs(initialData.end_time * 1000)}
            fullWidth={true}
            onChange={(value) => setEndTime(parseInt(value.unix()))}
          />
        </div>
        <div className="pricing">
          <div>Total Price = ₹{price.toFixed(2)}</div>
          <div>Previous Price = ₹{initialData.amount.toFixed(2)}</div>
        </div>
        <Button variant="outlined" onClick={handleEdit}>
          Update
        </Button>
        <div style={{ position: "absolute", top: 8 }}>
          {alertError && (
            <Alert severity="error">
              This room is already booked for that time
            </Alert>
          )}
          {alertSuccess && (
            <Alert severity="success">The booking has been updated</Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default Edit;
