import { useState, useEffect, useMemo } from "react";

import Menus from "../atoms/Menus";
import Table from "../atoms/Table";
import BookingRow from "./BookingRow";
import API_Service from "../../api/service";

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

function BookingTable({ filter, filterData }) {
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
      default:
        setBookData(globalBookData);
    }
  }, [filter, filterData]);
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Room</div>
          <div>Email</div>
          <div>Check-in</div>
          <div>Check-out</div>
          <div>Amount</div>
        </Table.Header>
        <Table.Body
          data={bookData}
          render={(booking) => (
            <BookingRow
              key={booking.id}
              booking={booking}
              handleUpdateData={handleUpdateData}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
