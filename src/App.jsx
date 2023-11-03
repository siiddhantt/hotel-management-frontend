import { useState } from "react";
import dayjs from "dayjs";
import { Dropdown, Space } from "antd";
import { Modal, Button } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import "./App.css";
import Create from "./components/Create";
import Bookings from "./components/bookings/Bookings";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  const [openPopup, setOpenPopup] = useState(false);
  const [filter, setFilter] = useState("none");
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
            handleRoomFilter("room-number");
          }}
        >
          Room number
        </button>
      ),
    },
    {
      key: "4",
      label: (
        <button
          onClick={() => {
            handleRoomFilter("start-time");
          }}
        >
          Start time
        </button>
      ),
    },
    {
      key: "5",
      label: (
        <button
          onClick={() => {
            handleRoomFilter("end-time");
          }}
        >
          End time
        </button>
      ),
    },
  ];
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <GlobalStyles />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "white",
            marginBottom: "10px",
            height: "3.5rem",
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
          <div
            style={{ display: "flex", alignItems: "center", width: "11rem" }}
          >
            <Dropdown
              menu={{
                items,
                selectable: true,
                defaultSelectedKeys: ["1"],
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Filter
                  <ArrowDropDownOutlined />
                </Space>
              </a>
            </Dropdown>
            {filter === "room-type" || filter === "room-number" ? (
              <input
                style={{
                  height: "100%",
                  width: "4.5rem",
                  color: "black",
                  fontSize: "15px",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
                onChange={(e) => {
                  setFilterData(e.target.value);
                }}
              ></input>
            ) : (
              <div style={{ maxWidth: "0.1rem" }}>
                <DateTimePicker
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                  }}
                  label=""
                  onChange={(value) => setFilterData(parseInt(value.unix()))}
                />
              </div>
            )}
          </div>
        </div>

        <Modal open={openPopup} onClose={handleRemovePopUp}>
          <Create initialData={{}} />
        </Modal>
        <Bookings filter={filter} filterData={filterData} />
      </LocalizationProvider>
    </div>
  );
}

export default App;
