import API_Service from "../api/service";

export const priceCalculate = async (
  roomNumber,
  startTime,
  endTime,
  setPrice
) => {
  const response = await API_Service.getPrice({
    room_id: roomNumber,
  });
  const { data } = response.data;
  if (data.length > 0)
    setPrice(
      Math.max(
        data[0].hourly_rate * ((endTime - startTime) / 3600).toFixed(2),
        0
      )
    );
  else setPrice(0);
};

export const convertEpoch = (epoch) => {
  const dateTime = new Date(epoch * 1000).toLocaleString();
  return dateTime;
};

export const epochToDateTime = (epoch) => {
  const date = new Date(epoch * 1000);
  const hours = date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let ampm = hours >= 12 ? "PM" : "AM";
  const time = `${hours}:${minutes} ${ampm}`;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dt = date.getDate();
  const formattedDate = `${dt}/${month}/${year}`;
  return {
    time,
    date: formattedDate,
  };
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "INR" }).format(
    value
  );
