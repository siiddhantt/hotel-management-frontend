import React from "react";

function Modal({ openPopUp, closePopUp, child }) {
  const handlelosePopUp = (e) => {
    if (e.target.id === "ModelContainer") closePopUp();
  };
  if (openPopUp !== true) return null;
  return (
    <div id="ModelContainer" onClick={handlelosePopUp} className="modal">
      <div className="modal-body">{child}</div>
    </div>
  );
}

export default Modal;
