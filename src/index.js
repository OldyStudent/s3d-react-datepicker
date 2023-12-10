import React, { useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import DatePicker from "./lib";
import "./index.css";
export default function App() {
  const formRef = useRef();
  const datePickerRef = useRef();
  const [value, setValue] = useState(null);
  function handleResetForm() {
    if (formRef.current) {
      formRef.current.reset();
    }

    if (datePickerRef.current) {
      datePickerRef.current.resetDatePicker();
    }
  }

  const customStyles = {
    inputField: { height: 40 },
    datepickerContainer: "custom-datepickerContainer",
    navigationSection: { background: "lightblue" },
    dropdownContainer: "custom-menu-dropdown-style",
    weekdaysHeader: { fontWeight: "bold" },
    daysGrid: { color: "green" },
  };

  const options = {
    format: "DD/MM/YYYY",
    lang: "fr",
    dayOfWeekStart: 1,
    // styles: customStyles,
  };

  function handleChangeDate(selectedDate) {
    console.log("handleChangeDate", selectedDate?.toString());
    setValue(selectedDate);
  }

  return (
    <>
      <h1>This is a test component !</h1>
      <form ref={formRef}>
        <label htmlFor="birthdate">Name</label>
        <DatePicker
          name="birthdate"
          id="birthdate"
          options={options}
          ref={datePickerRef}
          onChange={handleChangeDate}
        />

        <input type="date" />
      </form>
      <br />

      <p>Date is : {value ? value.toString() : ""}</p>
      <button onClick={handleResetForm}>Reset</button>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
