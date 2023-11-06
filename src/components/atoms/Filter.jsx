import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import CustomPicker from "./CustomPicker";

const Filter = ({ filter, setFilter, filterData, setFilterData }) => {
  const filters = [
    {
      label: "None",
      value: "none",
    },
    {
      label: "Room type",
      value: "room-type",
    },
    {
      label: "Room number",
      value: "room-number",
    },
    {
      label: "Check-in",
      value: "start-time",
    },
    {
      label: "Check-out",
      value: "end-time",
    },
  ];
  const handleTypeChange = (e) => {
    setFilter(e.target.value);
  };
  const handleValueChange = (e) => {
    setFilterData(e.target.value);
  };
  return (
    <div className="flex gap-1 items-center">
      <Select
        label="Filter"
        className="w-36"
        size="sm"
        radius="lg"
        value={filter}
        onChange={handleTypeChange}
      >
        {filters.map((filter) => (
          <SelectItem
            key={filter.value}
            value={filter.value}
            className="text-gray-500"
          >
            {filter.label}
          </SelectItem>
        ))}
      </Select>
      {filter === "room-type" || filter === "room-number" ? (
        <input
          className="text-center h-10 w-16 outline-none border-b-2 bg-transparent"
          type="text"
          value={filterData}
          onChange={handleValueChange}
        />
      ) : filter === "start-time" || filter === "end-time" ? (
        <CustomPicker setFilterData={setFilterData} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Filter;
