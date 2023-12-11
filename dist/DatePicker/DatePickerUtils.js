"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.generateDayClasses=generateDayClasses;exports.generateMergedStyles=generateMergedStyles;exports.getMonthName=getMonthName;exports.updateDatePickerContainerPosition=updateDatePickerContainerPosition;var _moment=_interopRequireDefault(require("moment"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}/**
 * Generates CSS classes for a calendar cell based on its properties.
 * @param {moment.Moment} selectedCellDate - Date of the selected cell.
 * @param {Object} cellDate - Object representing the date of the calendar cell.
 * @param {Object} options - Configuration options for generating classes.
 * @returns {string} - CSS class string for the calendar cell.
 */function generateDayClasses(selectedCellDate,cellDate,options){_moment.default.locale(options.lang);const{format,minDate,maxDate}=options;const classes=["calendar-day"];// Adds the "other-month" class if the cell is not in the current month.
if(!cellDate.isInCurrentMonth){classes.push("other-month")}// Adds the "current-day" class if the cell represents the current day.
if(cellDate.isCurrentDay){classes.push("current-day")}// Adds the "selected-cell" class if the cell is the selected cell.
if(selectedCellDate&&cellDate.date.isSame(selectedCellDate,"day")){classes.push("selected-cell")}// Adds the "disabled-cell" class if the cell is outside the specified limits.
if(minDate&&cellDate.date.isBefore((0,_moment.default)(minDate,format))||maxDate&&cellDate.date.isAfter((0,_moment.default)(maxDate,format))){classes.push("disabled-cell")}return classes.join(" ")}/**
 * Retrieves the name of the month from the list of months and a given date.
 * @param {Array} monthList - List of month names.
 * @param {moment.Moment} date - Date for which to get the month name.
 * @returns {string} - Month name.
 */function getMonthName(monthList,date){return monthList[date.month()].value}/**
 * Updates the position of the datePicker element relative to its parent.
 * @param {HTMLInputElement} inputElement - The bounding rectangle of the parent element.
 * @param {HTMLElement} datePickerContainer - The element to be positioned.
 * @returns {void}
 */function updateDatePickerContainerPosition(inputElement,datePickerContainer){const rectA=inputElement.getBoundingClientRect();datePickerContainer.style.top=rectA.top+rectA.height+3+"px";datePickerContainer.style.left=rectA.left-1+"px"}/**
 * Generates a merged object containing both className and style properties based on the provided options.
 * @param {object} styles The options object containing the style properties.
 * @returns {object} The merged object containing both className and style properties.
 */function generateMergedStyles(styles){if(!styles)return;const styleProperties=["inputField","datepickerContainer","navigationSection","dropdownContainer","weekdaysHeader","daysGrid"];const mergedStyles={};styleProperties.forEach(prop=>{const stylingValue=styles===null||styles===void 0?void 0:styles[prop];mergedStyles[prop]=typeof stylingValue==="string"?{className:stylingValue,style:{}}:{className:"",style:stylingValue}});return mergedStyles}