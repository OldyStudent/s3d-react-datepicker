/**
 * DatePicker component for selecting dates.
 * @module DatePicker
 * @param {Object} props - Component properties.
 * @param {string} props.name - The name of the input field.
 * @param {string} props.id - The id of the input field.
 * @param {Object} props.options - Additional options for the DatePicker.
 * @returns {JSX.Element} The DatePicker component.
 */

import "./DatePicker.css";
import moment from "moment";
import React, {useEffect, useRef, useState, useMemo, useImperativeHandle} from "react";

import DropDown from "./DropDown/DropDown";
import IconButton from "./IconButton/IconButton";
import useCalendarData from "./hooks/useCalendarData/useCalendarData";
import { defaultOptions } from "./DatePickerDefaultOptions";
import {
  generateDayClasses,
  getMonthName,
  updateDatePickerContainerPosition,
} from "./DatePickerUtils";

import {
  faCaretLeft,
  faCaretRight,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Functional component representing the DatePicker.
 * @param {Object} props - Component properties.
 * @param {string} props.name - The name of the input field.
 * @param {string} props.id - The id of the input field.
 * @param {Object} props.options - Additional options for the DatePicker.
 * @returns {JSX.Element} The DatePicker component.
 */
const DatePicker = ({ name, id, options }, ref) => {
  const mergedOptions = useMemo(() => {
    return { ...defaultOptions, ...options };
  }, [options]);

  moment.locale(mergedOptions.lang);

  const inputRef = useRef();
  const datePickerContainerRef = useRef();
  const componentContainerRef = useRef();

  const [inputValue, setInputValue] = useState("");
  const [selectedCellDate, setSelectedCellDate] = useState(null);
  const [visibleDropDown, setVisibleDropDown] = useState(null);

  const [currentDate, setCurrentDate] = useState(() => {
    if (mergedOptions.defaultDate) {
      const defaultDate = moment(
        mergedOptions.defaultDate,
        mergedOptions.format,
        false,
      );
      setSelectedCellDate(defaultDate);
      setInputFormatted(defaultDate);
      return defaultDate;
    }
    return moment(new Date());
  });


  // Define functions to expose using ref
  useImperativeHandle(ref, () => ({
    resetDatePicker : () => {
      setSelectedCellDate(null);
      setCurrentDate(moment());
      setInputValue("")
      setVisibleDropDown(null);
    },
  }), []);


  /**
   * Sets the input value formatted according to the specified date format.
   * @param {moment.Moment} date - The date to be formatted
   */
  function setInputFormatted(date) {
    setInputValue(date.format(mergedOptions.format));
  }

  const { dayNameList, monthNameList, yearList, calendarDayList } =
    useCalendarData(currentDate, mergedOptions);

  useEffect(() => {
    // Handles clicks outside the component to hide the DatePicker.
    const handleOutsideClick = (e) => {
      const target = e.target;
      if (!componentContainerRef.current.contains(target)) {
        datePickerContainerRef.current.classList.add("hide");
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  /**
   * Handles the selection of a month.
   * @param {number} monthIndex - The selected month index 0 - 11.
   * @returns {void}
   */
  const handleSelectMonth = (monthIndex) => {
    setCurrentDate((prevDate) => prevDate.clone().month(monthIndex));
    setVisibleDropDown(null);
  };

  /**
   * Handles the selection of a year.
   * @param {number} yearIndex - The selected year index.
   * @returns {void}
   */
  const handleSelectYear = (yearIndex) => {
    setCurrentDate((prevDate) => prevDate.clone().year(yearIndex));
    setVisibleDropDown(null);
  };

  /**
   * Handles changing the month forward or backward.
   * @param {number} increment - The increment value for the month change.
   * @returns {void}
   */
  const handleChangeMonth = (increment) => {
    setCurrentDate((prevDate) => prevDate.clone().add(increment, "months"));
    setVisibleDropDown(null);
  };

  /**
   * Resets the current date to the current moment.
   * @returns {void}
   */
  const handleResetCurrentDate = () => {
    const date = moment();
    setSelectedCellDate(date);
    setCurrentDate(date);
    setInputFormatted(date);
    setVisibleDropDown(null);
  };

  /**
   * Handles the validation of the input value and updates the state accordingly.
   * @returns {void}
   */
  const handleInputValidation = () => {
    if (!inputValue) {
      // setCurrentDate(null);
      setSelectedCellDate(null);
      return;
    }
    const inputDate = moment(inputValue, mergedOptions.format, false);
    const newDate = inputDate.isValid() ? inputDate : moment();

    setCurrentDate(newDate);
    setSelectedCellDate(newDate);
    setInputFormatted(newDate);
  };

  /**
   * Handles the click event on a calendar cell.
   * @param {HTMLElement} targetElement target of The click event.
   * @param {moment.Moment} selectedDate - The date associated with the clicked cell.
   * @returns {void}
   */
  const handleCalendarCellClick = (targetElement, selectedDate) => {
    if (targetElement.classList.contains("disabled-cell")) {
      return;
    }

    if (mergedOptions.onChange) {
      mergedOptions.onChange(selectedDate);
    }

    if (!selectedCellDate || !selectedCellDate.isSame(selectedDate)) {
      setInputFormatted(selectedDate);
      setSelectedCellDate(selectedDate);
      setVisibleDropDown(null);

      // Hiding the DatePicker after selecting a day
      if (datePickerContainerRef.current) {
        datePickerContainerRef.current.classList.add("hide");
      }
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    if (mergedOptions.onChange && inputValue === "") {
      mergedOptions.onChange(null);
    }
  };

  return (
    <div ref={componentContainerRef}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        name={name}
        id={id}
        className="DateTimePicker__input"
        onChange={handleInputChange}
        onBlur={handleInputValidation}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleInputValidation();
          }
        }}
        onClick={() => {
          if (datePickerContainerRef.current && inputRef.current) {
            if (inputRef.current !== "") {
              handleInputValidation();
            }

            updateDatePickerContainerPosition(inputRef.current, datePickerContainerRef.current,);
            datePickerContainerRef.current.classList.toggle("hide");
            setVisibleDropDown(null);
          }
        }}
      />
      {mergedOptions.datepicker && (
        <div className="DateTimePicker hide" ref={datePickerContainerRef} role="dialog">
          {/* Header section */}
          <header
            className={`DateTimePicker__header ${
              mergedOptions.rtl ? "DateTimePicker__header--reversed" : ""
            }`}
          >
            {/* Previous month button */}
            <IconButton
              icon={mergedOptions.rtl ? faCaretRight : faCaretLeft}
              onClick={() => handleChangeMonth(-1)}
            />

            {/* Reset date button */}
            <IconButton icon={faHouse} onClick={handleResetCurrentDate} />

            {/* Month and year selection */}
            <div className="DateTimePicker__header__month-year-menu">
              <DropDown
                name="month"
                items={monthNameList}
                label={getMonthName(monthNameList, currentDate)}
                onSelect={handleSelectMonth}
                isVisible={visibleDropDown === "month"}
                setActiveDropDownName={setVisibleDropDown}
              />

              <DropDown
                name="year"
                items={yearList}
                label={currentDate.format("YYYY")}
                onSelect={handleSelectYear}
                isVisible={visibleDropDown === "year"}
                setActiveDropDownName={setVisibleDropDown}
              />
            </div>

            {/* Next month button */}
            <IconButton
              icon={mergedOptions.rtl ? faCaretLeft : faCaretRight}
              onClick={() => handleChangeMonth(1)}
            />
          </header>

          {/* Calendar section */}
          <div className="DateTimePicker__calendar">
            {/* Calendar header */}
            <div className="DateTimePicker__calendar__header">
              {dayNameList.map((day) => (
                <div key={day.index}>{day.name}</div>
              ))}
            </div>
            {/* Calendar body */}
            <div className="DateTimePicker__calendar__body">
              {calendarDayList.map((currentCellDate) => (
                <div
                  key={currentCellDate.index}
                  className={generateDayClasses(
                    selectedCellDate,
                    currentCellDate,
                    mergedOptions,
                  )}
                  onClick={(event) =>
                    handleCalendarCellClick(event.target, currentCellDate.date)
                  }
                >
                  {currentCellDate.date.format("D")}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(DatePicker);
