import moment from "moment";

/**
 * Generates CSS classes for a calendar cell based on its properties.
 * @param {moment.Moment} selectedCellDate - Date of the selected cell.
 * @param {Object} cellDate - Object representing the date of the calendar cell.
 * @param {Object} options - Configuration options for generating classes.
 * @returns {string} - CSS class string for the calendar cell.
 */
export function generateDayClasses(selectedCellDate, cellDate, options) {
  moment.locale(options.lang);

  const { format, minDate, maxDate } = options;
  const classes = ["calendar-day"];

  // Adds the "other-month" class if the cell is not in the current month.
  if (!cellDate.isInCurrentMonth) {
    classes.push("other-month");
  }

  // Adds the "current-day" class if the cell represents the current day.
  if (cellDate.isCurrentDay) {
    classes.push("current-day");
  }

  // Adds the "selected-cell" class if the cell is the selected cell.
  if (selectedCellDate && cellDate.date.isSame(selectedCellDate, "day")) {
    classes.push("selected-cell");
  }

  // Adds the "disabled-cell" class if the cell is outside the specified limits.
  if (
    (minDate && cellDate.date.isBefore(moment(minDate, format))) ||
    (maxDate && cellDate.date.isAfter(moment(maxDate, format)))
  ) {
    classes.push("disabled-cell");
  }

  return classes.join(" ");
}

/**
 * Retrieves the name of the month from the list of months and a given date.
 * @param {Array} monthList - List of month names.
 * @param {moment.Moment} date - Date for which to get the month name.
 * @returns {string} - Month name.
 */
export function getMonthName(monthList, date) {
  return monthList[date.month()].value;
}

/**
 * Updates the position of the datePicker element relative to its parent.
 * @param {HTMLInputElement} inputElement - The bounding rectangle of the parent element.
 * @param {HTMLElement} datePickerContainer - The element to be positioned.
 * @returns {void}
 */
export function updateDatePickerContainerPosition(
  inputElement,
  datePickerContainer,
) {
  const rectA = inputElement.getBoundingClientRect();
  datePickerContainer.style.top = rectA.top + rectA.height + 3 + "px";
  datePickerContainer.style.left = rectA.left - 3 + "px";
}
