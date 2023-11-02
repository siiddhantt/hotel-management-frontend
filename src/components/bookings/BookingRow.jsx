import React, { useState } from "react";
import { Button, Modal } from "@mui/material";
import styled from "styled-components";

import Table from "../atoms/Table";
import Cancel from "../Cancel";
import Edit from "../Edit";
import { formatCurrency } from "../../utils/helpers";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding-right: 0.5rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking }) {
  const [cancelData, setCancelData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [refund, setRefund] = useState(0.0);
  const convert = (epoch) => {
    const dateTime = new Date(epoch * 1000).toLocaleString();
    return dateTime;
  };
  const handleCancel = async () => {
    setCancelData(booking);
    const timediff = booking.start_time - Math.floor(Date.now() / 1000);
    if (timediff > 172800) setRefund(booking.amount);
    else if (timediff >= 86400 && timediff <= 172800)
      setRefund(booking.amount * 0.5);
    else setRefund(0.0);
    setOpenPopup(true);
  };
  const handleEdit = async () => {
    setEditData(booking);
    console.log(booking);
    setEditOpenPopup(true);
  };
  const [openPopup, setOpenPopup] = useState(false);
  const handleRemovePopUp = () => setOpenPopup(false);
  const [openEditPopup, setEditOpenPopup] = useState(false);
  const handleEditRemovePopUp = () => setEditOpenPopup(false);
  return (
    <>
      <Table.Row>
        <Cabin>{booking.room_id}</Cabin>
        <Stacked>
          <span>{booking.user_email}</span>
        </Stacked>
        <Stacked>
          <span>{convert(booking.start_time)}</span>
        </Stacked>
        <Stacked>
          <span>{convert(booking.end_time)}</span>
        </Stacked>
        <Amount>{formatCurrency(booking.amount)}</Amount>
        <div style={{ marginRight: "2px" }}>
          <Stacked>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEdit()}
            >
              Edit
            </Button>
            <Button variant="outlined" onClick={() => handleCancel()}>
              Cancel
            </Button>
          </Stacked>
        </div>
      </Table.Row>
      <Modal open={openPopup} onClose={handleRemovePopUp}>
        <Cancel data={cancelData} refund={refund} onClose={handleRemovePopUp} />
      </Modal>
      <Modal open={openEditPopup} onClose={handleEditRemovePopUp}>
        <Edit initialData={editData} />
      </Modal>
    </>
  );
}

export default BookingRow;
