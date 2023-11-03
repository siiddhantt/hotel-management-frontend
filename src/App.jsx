import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Modal, Button } from "@mui/material";
import { AddCircle } from "@mui/icons-material";

import "./App.css";
import Create from "./components/Create";
import Bookings from "./components/bookings/Bookings";
import GlobalStyles from "./styles/GlobalStyles";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import { Dropdown, Space } from "antd";

function App() {
  const [openPopup, setOpenPopup] = useState(false);
  const [filter, setFilter] = useState("");
  const [filterData, setFilterData] = useState("");
  const handleRemovePopUp = () => setOpenPopup(false);
  const handleBooking = () => setOpenPopup(true);
  const handleRoomFilter = (filter) => setFilter(filter);
  const items = [
    {
      key: "1",
      label: (
        <button
          onClick={() => {
            handleRoomFilter("none");
          }}
        >
          None
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          onClick={() => {
            handleRoomFilter("room-type");
          }}
        >
          Room type
        </button>
      ),
    },
    {
      key: "3",
      label: (
        <button
          onClick={() => {
            console.log("yoooo");
            handleRoomFilter("room-number");
          }}
        >
          Room number
        </button>
      ),
    },
  ];
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <GlobalStyles />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "white",
          marginBottom: "10px",
          width: "100%",
        }}
      >
        <Button
          variant="outlined"
          color="success"
          startIcon={<AddCircle />}
          onClick={handleBooking}
        >
          Add new booking
        </Button>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Dropdown
            menu={{
              items,
              selectable: true,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Filter
                <ArrowDropDownOutlined />
              </Space>
            </a>
          </Dropdown>
          <input
            style={{
              width: "4.5rem",
              height: "1.5rem",
              color: "black",
              fontSize: "15px",
              textAlign: "center",
            }}
            onChange={(e) => {
              setFilterData(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Modal open={openPopup} onClose={handleRemovePopUp}>
          <Create initialData={{}} />
        </Modal>
        <Bookings filter={filter} filterData={filterData} />
      </LocalizationProvider>
    </div>
  );
}

export default App;
