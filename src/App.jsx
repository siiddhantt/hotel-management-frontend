import { useState } from "react";
import { Modal } from "@mui/material";
import { Button } from "@nextui-org/react";
import { AddCircle } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

import "./App.css";
import Filter from "./components/atoms/Filter";
import Create from "./components/Create";
import BookingsTable from "./components/BookingsTable";

function App() {
  const [openPopup, setOpenPopup] = useState(false);
  const [filter, setFilter] = useState("none");
  const [filterData, setFilterData] = useState("");
  const handleRemovePopUp = () => setOpenPopup(false);
  const handleBooking = () => setOpenPopup(true);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="menubar rounded-2xl">
            <Button
              variant="flat"
              color="default"
              radius="lg"
              className="p-6"
              startContent={<AddCircle />}
              onClick={handleBooking}
            >
              New booking
            </Button>
            <Filter
              filter={filter}
              setFilter={setFilter}
              filterData={filterData}
              setFilterData={setFilterData}
            />
          </div>
          <Modal open={openPopup} onClose={handleRemovePopUp}>
            <Create initialData={{}} />
          </Modal>
          <BookingsTable filter={filter} filterData={filterData} />
        </LocalizationProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
