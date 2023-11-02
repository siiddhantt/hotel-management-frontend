import React, { useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { IconButton, Modal } from "@mui/material";
import EditRounded from "@mui/icons-material/EditRounded";
import { CancelRounded } from "@mui/icons-material";
import Cancel from "../Cancel";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const renderDetailsButton = ({ handleCancel }) => {
  const [openPopup, setOpenPopup] = useState(true);
  const handleRemovePopUp = () => setOpenPopup(false);
  return (
    <strong style={{ display: "flex" }}>
      <IconButton color="primary">
        <EditRounded />
      </IconButton>
      <IconButton color="error" onClick={() => {}}>
        <CancelRounded />
      </IconButton>
      {/* <Modal open={openPopup} onClose={handleRemovePopUp}>
        <Cancel data={cancelData} refund={0} />
      </Modal> */}
    </strong>
  );
};

export default function ControlledFilters({ data }) {
  const [selectedRow, setSelectedRow] = useState({});
  let columns = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
    },
    {
      field: "room_id",
      headerName: "Room",
      type: "number",
    },
    {
      field: "user_email",
      headerName: "Email",
      type: "string",
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
    },
    {
      field: "start_time",
      headerName: "Check-in",
      type: "dateTime",
    },
    {
      field: "end_time",
      headerName: "Check-out",
      type: "dateTime",
    },
    {
      field: "edit",
      headerName: "",
      renderCell: renderDetailsButton,
    },
  ];

  const [filterModel, setFilterModel] = React.useState({
    items: [],
  });

  var valData = data;
  const modifyData = () => {
    let res = [];
    for (let item of valData) {
      item.start_time = new Date(item.start_time);
      item.end_time = new Date(item.end_time);
      res.push(item);
    }
    return res;
  };

  let newData = {
    columns,
    rows: modifyData(),
  };

  const onRowsSelectionHandler = (ids) => {
    console.log(ids.row);
  };

  return (
    <div style={{ height: 400, width: "auto", zIndex: "-1" }}>
      <DataGrid
        {...newData}
        slots={{
          toolbar: CustomToolbar,
        }}
        filterModel={filterModel}
        onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
        onRowClick={(ids) => onRowsSelectionHandler(ids)}
      />
    </div>
  );
}
