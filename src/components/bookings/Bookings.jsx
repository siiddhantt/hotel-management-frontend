import BookingTable from "./BookingTable";

function Bookings({ filter, filterData }) {
  return (
    <>
      <BookingTable filter={filter} filterData={filterData} />
    </>
  );
}

export default Bookings;
