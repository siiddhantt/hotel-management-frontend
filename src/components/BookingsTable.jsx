import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { Modal } from "@mui/material";
import { EditIcon } from "./atoms/icons/EditIcon";
import { DeleteIcon } from "./atoms/icons/DeleteIcon";
import Edit from "./Edit";
import Cancel from "./Cancel";
import { columns } from "./atoms/data";
import { formatCurrency, epochToDateTime } from "./../utils/helpers";

const statusColorMap = {
  upcoming: "success",
  passed: "warning",
};
import API_Service from "../api/service";

function filterByRoomType(bookings, roomType) {
  return bookings.filter((booking) => {
    return booking.room_type === roomType;
  });
}

function filterByRoomNumber(bookings, roomNumber) {
  return bookings.filter((booking) => {
    return booking.room_id === roomNumber;
  });
}

function filterByStartTime(bookings, startTime) {
  return bookings.filter((booking) => {
    return booking.start_time >= startTime;
  });
}

function filterByEndTime(bookings, endTime) {
  return bookings.filter((booking) => {
    return booking.end_time <= endTime;
  });
}

function BookingsTable({ filter, filterData }) {
  const [globalBookData, setGlobalBookData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const handleUpdateData = () => setUpdateData(!updateData);
  const fetchData = useMemo(async () => {
    const response = await API_Service.getBookings();
    const data = response.data.data;
    setBookData(data);
    setGlobalBookData(data);
  }, [updateData]);
  useEffect(() => {
    () => fetchData;
    switch (filter) {
      case "room-type":
        setBookData(filterByRoomType(globalBookData, filterData));
        break;
      case "room-number":
        setBookData(filterByRoomNumber(globalBookData, parseInt(filterData)));
        break;
      case "start-time":
        setBookData(filterByStartTime(globalBookData, parseInt(filterData)));
        break;
      case "end-time":
        setBookData(filterByEndTime(globalBookData, parseInt(filterData)));
        break;
      default:
        setBookData(globalBookData);
    }
  }, [filter, filterData]);
  const [cancelData, setCancelData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [refund, setRefund] = useState(0.0);
  const handleCancel = async (booking) => {
    setCancelData(booking);
    const timediff = booking.start_time - Math.floor(Date.now() / 1000);
    if (timediff > 172800) setRefund(booking.amount);
    else if (timediff >= 86400 && timediff <= 172800)
      setRefund(booking.amount * 0.5);
    else setRefund(0.0);
    setOpenPopup(true);
  };
  const handleEdit = async (booking) => {
    setEditData(booking);
    setEditOpenPopup(true);
  };
  const [openPopup, setOpenPopup] = useState(false);
  const handleRemovePopUp = () => setOpenPopup(false);
  const [openEditPopup, setEditOpenPopup] = useState(false);
  const handleEditRemovePopUp = () => setEditOpenPopup(false);
  const renderCell = React.useCallback((booking, columnKey) => {
    const cellValue = booking[columnKey];

    switch (columnKey) {
      case "user_email":
        return (
          <User
            avatarProps={{ radius: "lg", src: booking.avatar }}
            name={cellValue}
          >
            {booking.email}
          </User>
        );
      case "room_type":
        return (
          <div className="flex flex-col text-center">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {booking.room_id}
            </p>
          </div>
        );
      case "start_time":
        return (
          <div className="flex flex-col text-center">
            <p className="text-bold text-sm capitalize">
              {epochToDateTime(cellValue).time}
            </p>
            <p className="text-bold text-sm capitalize text-default-400">
              {epochToDateTime(booking.start_time).date}
            </p>
          </div>
        );
      case "end_time":
        return (
          <div className="flex flex-col text-center">
            <p className="text-bold text-sm capitalize">
              {epochToDateTime(cellValue).time}
            </p>
            <p className="text-bold text-sm capitalize text-default-400">
              {epochToDateTime(booking.end_time).date}
            </p>
          </div>
        );
      case "amount":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {formatCurrency(cellValue)}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={
              statusColorMap[
                booking.start_time * 1000 > new Date() ? "upcoming" : "passed"
              ]
            }
            size="sm"
            variant="flat"
          >
            {booking.start_time * 1000 > new Date() ? "upcoming" : "passed"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit booking" className="text-black">
              <button
                className="text-lg text-default-400 cursor-pointer active:opacity-50 outline-none"
                onClick={() => handleEdit(booking)}
              >
                <EditIcon />
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Cancel booking">
              <button
                className="text-lg text-danger cursor-pointer active:opacity-50 outline-none"
                onClick={() => handleCancel(booking)}
              >
                <DeleteIcon />
              </button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        <TableBody items={bookData}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal open={openPopup} onClose={handleRemovePopUp}>
        <Cancel
          data={cancelData}
          refund={refund}
          onClose={handleRemovePopUp}
          handleUpdateData={handleUpdateData}
        />
      </Modal>
      <Modal open={openEditPopup} onClose={handleEditRemovePopUp}>
        <Edit initialData={editData} handleUpdateData={handleUpdateData} />
      </Modal>
    </>
  );
}

export default BookingsTable;
