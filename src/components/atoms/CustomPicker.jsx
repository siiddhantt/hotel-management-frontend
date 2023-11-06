import * as React from "react";
import { Button } from "@nextui-org/react";
import { DateTimePicker } from "@mui/x-date-pickers";

function ButtonField(props) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;
  return (
    <Button
      variant="flat"
      color="default"
      radius="lg"
      className="p-6"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
    >
      {label ? `${label}` : "Date/Time"}
    </Button>
  );
}

function ButtonDateTimePicker(props) {
  const [open, setOpen] = React.useState(false);
  return (
    <DateTimePicker
      slots={{ field: ButtonField, ...props.slots }}
      slotProps={{ field: { setOpen } }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
}

function CustomPicker({ setFilterData }) {
  const [value, setValue] = React.useState(null);
  return (
    <ButtonDateTimePicker
      label={value == null ? null : value.format("MM/DD/YYYY hh:mm a")}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        setFilterData(parseInt(newValue.unix()));
      }}
    />
  );
}

export default CustomPicker;
