import { useState, useEffect } from "react";
import Menus from "../atoms/Menus";
import Table from "../atoms/Table";
import BookingRow from "./BookingRow";

import API_Service from "../../api/service";

function filterByRoomNumber(bookings, roomNumber) {
  return bookings.filter((booking) => {
    return booking.room_id === roomNumber;
  });
}

function BookingTable({ filter, filterData }) {
  const [bookData, setBookData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await API_Service.getBookings();
      const data = response.data.data;
      console.log(filterData)
      if (filter === "room-number")
        setBookData(filterByRoomNumber(data, parseInt(filterData)));
      else setBookData(data);
    };
    fetchData();
  }, [filterData]);
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
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;