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

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "INR" }).format(
    value
  );
