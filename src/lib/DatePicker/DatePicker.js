/**
 * DatePicker component for selecting dates.
 * @module DatePicker
 * @param {Object} props - Component properties.
 * @param {string} props.name - The name of the input field.
 * @param {string} props.id - The id of the input field.
 * @param {Function} props.onChange - Function to be called when the selected date changes.
 * @param {Object} props.options - Additional options for the DatePicker.
 * @param {React.RefObject} ref - props.ref - Optional ref to access the internal state and methods of the component.
 * @returns {JSX.Element} The DatePicker component.
 */

import "./DatePicker.css";
import moment from "moment";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useImperativeHandle,
  useCallback,
} from "react";

import DropDown from "./DropDown/DropDown";
import IconButton from "./IconButton/IconButton";
import useCalendarData from "./hooks/useCalendarData";
import { defaultOptions } from "./DatePickerDefaultOptions";
import {
  generateDayClasses,
  generateMergedStyles,
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
 * @param {Function} props.onChange - Function to be called when the selected date changes.
 * @param {Object} props.options - Additional options for the DatePicker.
 * @param {React.RefObject} ref - props.ref - Optional ref to access the internal state and methods of the component.
 * @returns {JSX.Element} The DatePicker component.
 */
const DatePicker = ({ name, id, onChange, options }, ref) => {
  const mergedOptions = useMemo(() => {
    return { ...defaultOptions, ...options };
  }, [options]);

  moment.locale(mergedOptions.lang);

  const inputRef = useRef();
  const componentContainerRef = useRef();
  const datePickerContainerRef = useRef();

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

  /**
   * Sets the input value formatted according to the specified date format.
   * @param {moment.Moment} date - The date to be formatted
   */
  function setInputFormatted(date) {
    setInputValue(date.format(mergedOptions.format));
  }

  const { dayNameList, monthNameList, yearList, calendarDayList } =
    useCalendarData(currentDate, mergedOptions);

  const handleOutsideClick = useCallback((e) => {
    const target = e.target;
    if (!componentContainerRef.current?.contains(target)) {
      datePickerContainerRef.current?.classList.add("hidden");
      setVisibleDropDown(null);
    }
  }, []);

  useEffect(() => {
    // Handles clicks outside the component to hide the DatePicker.
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedCellDate);
    }
  }, [selectedCellDate]);

  // Define functions to expose using ref
  useImperativeHandle(
    ref,
    () => ({
      resetDatePicker: () => {
        setSelectedCellDate(null);
        setCurrentDate(moment());
        setInputValue("");
        setVisibleDropDown(null);
      },
    }),
    [],
  );

  /**
   * Handles the selection of a month or a year.
   * @param {number} index - The selected month or year index.
   * @param {string} type - "year" or "month"
   * @returns {void}
   */
  const handleMonthOrYearSelection = (index, type) => {
    if (type === "month") {
      setCurrentDate((prevDate) => prevDate.clone().month(index));
    } else {
      setCurrentDate((prevDate) => prevDate.clone().year(index));
    }
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
   * Handles the click event on a calendar cell.
   * @param {HTMLElement} targetElement target of The click event.
   * @param {moment.Moment} selectedDate - The date associated with the clicked cell.
   * @returns {void}
   */
  const handleCalendarCellClick = (targetElement, selectedDate) => {
    if (targetElement.classList.contains("disabled-cell")) {
      return;
    }

    if (!selectedCellDate || !selectedCellDate.isSame(selectedDate)) {
      setInputFormatted(selectedDate);
      setSelectedCellDate(selectedDate);
      setCurrentDate(selectedDate);
      setVisibleDropDown(null);

      // Hiding the DatePicker after selecting a day
      datePickerContainerRef.current?.classList.add("hidden");
    }
  };

  /**
   * Handles the click event on the input field.
   * @returns {void}
   */
  const handleInputClick = () => {
    if (inputRef.current !== "") {
      handleInputValidation();
    }
    // Hide visible DropDowns
    setVisibleDropDown(null);

    if (datePickerContainerRef.current) {
      // Calculate dialog position and display it
      updateDatePickerContainerPosition(
        inputRef.current,
        datePickerContainerRef.current,
      );
      datePickerContainerRef.current?.classList.toggle("hidden");
    }
  };

  /**
   * Handles the validation of the input value and updates the state accordingly.
   * @returns {void}
   */
  const handleInputValidation = () => {
    if (inputValue.trim() === "") {
      setInputValue("");
      setSelectedCellDate(null);
      return;
    }

    const inputDate = moment(inputValue, mergedOptions.format, true);
    const newDate = inputDate.isValid() ? inputDate : moment();
    setInputFormatted(newDate);

    if (!selectedCellDate || !selectedCellDate.isSame(newDate)) {
      setCurrentDate(newDate);
      setSelectedCellDate(newDate);
    }
  };

  /**
   * Handles the change event on the input field.
   * @param {ChangeEvent} event - The change event.
   * @returns {void}
   */
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue.replace(/[^0-9\s/-]/g, ""));

    if (inputValue === "") {
      setSelectedCellDate(null);
    } else {
      const inputDate = moment(inputValue, mergedOptions.format, true);

      if (inputDate.isValid()) {
        setCurrentDate(inputDate);
        setSelectedCellDate(inputDate);
      }
    }
  };

  /**
   * Handles the key down event on the input field, specifically the "Enter" key.
   * @param {KeyboardEvent} event - The keyboard event.
   * @returns {void}
   */
  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleInputValidation();
      datePickerContainerRef.current?.classList.add("hidden");
    }
  };

  const {
    inputField,
    datepickerContainer,
    navigationSection,
    dropdownContainer,
    weekdaysHeader,
    daysGrid,
  } = useMemo(
    () => generateMergedStyles(mergedOptions.styles || {}),
    [mergedOptions.styles],
  );

  return (
    <div ref={componentContainerRef}>
      <input
        type="text"
        name={name}
        id={id}
        ref={inputRef}
        value={inputValue}
        className={`S3D-DatePicker__input ${inputField.className}`}
        style={inputField.style}
        onChange={handleInputChange}
        onBlur={handleInputValidation}
        onKeyDown={handleInputKeyDown}
        onClick={handleInputClick}
      />
      {mergedOptions.datepicker && (
        <div
          className={`S3D-DatePicker hidden ${datepickerContainer.className}`}
          style={datepickerContainer.style}
          ref={datePickerContainerRef}
          role="dialog"
        >
          {/* Header section */}
          <header
            className={`S3D-DatePicker__header ${
              mergedOptions.rtl ? "S3D-DatePicker__header--reversed" : ""
            } ${navigationSection.className}`}
            style={navigationSection.style}
          >
            {/* Previous month button */}
            <IconButton
              icon={mergedOptions.rtl ? faCaretRight : faCaretLeft}
              onClick={() => handleChangeMonth(-1)}
              ariaLabel={mergedOptions.rtl ? "Next month" : "Previous month"}
            />

            {/* Reset date button */}
            <IconButton
              icon={faHouse}
              onClick={handleResetCurrentDate}
              ariaLabel="Reset to current date"
            />

            {/* Month and year selection */}
            <div
              className={`S3D-DatePicker__header__month-year-menu ${dropdownContainer.className}`}
              style={dropdownContainer.style}
            >
              <DropDown
                name="month"
                items={monthNameList}
                label={getMonthName(monthNameList, currentDate)}
                onSelect={(index) => handleMonthOrYearSelection(index, "month")}
                isVisible={visibleDropDown === "month"}
                setActiveDropDownName={setVisibleDropDown}
              />

              <DropDown
                name="year"
                items={yearList}
                label={currentDate.format("YYYY")}
                onSelect={(index) => handleMonthOrYearSelection(index, "year")}
                isVisible={visibleDropDown === "year"}
                setActiveDropDownName={setVisibleDropDown}
              />
            </div>

            {/* Next month button */}
            <IconButton
              icon={mergedOptions.rtl ? faCaretLeft : faCaretRight}
              onClick={() => handleChangeMonth(1)}
              ariaLabel={mergedOptions.rtl ? "Previous Month" : "Next month"}
            />
          </header>

          {/* Calendar section */}
          <div
            className={`S3D-DatePicker__calendar ${weekdaysHeader.className}`}
            style={weekdaysHeader.style}
          >
            {/* Calendar header */}
            <div className="S3D-DatePicker__calendar__header">
              {dayNameList.map((day) => (
                <div key={day.index}>{day.name}</div>
              ))}
            </div>
            {/* Calendar body */}
            <div
              className={`S3D-DatePicker__calendar__body ${daysGrid.className}`}
              style={daysGrid.style}
            >
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
