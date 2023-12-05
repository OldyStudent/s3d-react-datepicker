"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;require("./DatePicker.css");var _moment=_interopRequireDefault(require("moment"));var _react=_interopRequireWildcard(require("react"));var _DropDown=_interopRequireDefault(require("./DropDown/DropDown"));var _IconButton=_interopRequireDefault(require("./IconButton/IconButton"));var _useCalendarData=_interopRequireDefault(require("./hooks/useCalendarData/useCalendarData"));var _DatePickerDefaultOptions=require("./DatePickerDefaultOptions");var _DatePickerUtils=require("./DatePickerUtils");var _freeSolidSvgIcons=require("@fortawesome/free-solid-svg-icons");function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap,t=new WeakMap;return(_getRequireWildcardCache=function(e){return e?t:r})(e)}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u]}return n.default=e,t&&t.set(e,n),n}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}/**
 * DatePicker component for selecting dates.
 * @module DatePicker
 * @param {Object} props - Component properties.
 * @param {string} props.name - The name of the input field.
 * @param {string} props.id - The id of the input field.
 * @param {Object} props.options - Additional options for the DatePicker.
 * @returns {JSX.Element} The DatePicker component.
 */ /**
 * Functional component representing the DatePicker.
 * @param {Object} props - Component properties.
 * @param {string} props.name - The name of the input field.
 * @param {string} props.id - The id of the input field.
 * @param {Object} props.options - Additional options for the DatePicker.
 * @returns {JSX.Element} The DatePicker component.
 */const DatePicker=_ref=>{let{name,id,options}=_ref;const mergedOptions=(0,_react.useMemo)(()=>{return{..._DatePickerDefaultOptions.defaultOptions,...options}},[options]);_moment.default.locale(mergedOptions.lang);const inputRef=(0,_react.useRef)();const datePickerRef=(0,_react.useRef)();const componentContainerRef=(0,_react.useRef)();const[inputValue,setInputValue]=(0,_react.useState)("");const[selectedCellDate,setSelectedCellDate]=(0,_react.useState)(null);const[visibleDropDown,setVisibleDropDown]=(0,_react.useState)(null);const[currentDate,setCurrentDate]=(0,_react.useState)(()=>{if(mergedOptions.defaultDate){const defaultDate=(0,_moment.default)(mergedOptions.defaultDate,mergedOptions.format,false);setSelectedCellDate(defaultDate);setInputFormatted(defaultDate);return defaultDate}return(0,_moment.default)(new Date)});/**
   * Sets the input value formatted according to the specified date format.
   * @param {moment.Moment} date - The date to be formatted
   */function setInputFormatted(date){setInputValue(date.format(mergedOptions.format))}const{dayNameList,monthNameList,yearList,calendarDayList}=(0,_useCalendarData.default)(currentDate,mergedOptions);(0,_react.useEffect)(()=>{// Handles clicks outside the component to hide the DatePicker.
const handleOutsideClick=e=>{const target=e.target;if(!componentContainerRef.current.contains(target)){datePickerRef.current.classList.add("hide")}};window.addEventListener("click",handleOutsideClick);return()=>{window.removeEventListener("click",handleOutsideClick)}},[]);/**
   * Handles the selection of a month.
   * @param {number} monthIndex - The index of the selected month.
   * @returns {void}
   */const handleSelectMonth=monthIndex=>{setCurrentDate(prevDate=>prevDate.clone().month(monthIndex));setVisibleDropDown(null)};/**
   * Handles the selection of a year.
   * @param {number} yearIndex - The selected year.
   * @returns {void}
   */const handleSelectYear=yearIndex=>{setCurrentDate(prevDate=>prevDate.clone().year(yearIndex));setVisibleDropDown(null)};/**
   * Handles changing the month forward or backward.
   * @param {number} increment - The increment value for the month change.
   * @returns {void}
   */const handleChangeMonth=increment=>{setCurrentDate(prevDate=>prevDate.clone().add(increment,"months"));setVisibleDropDown(null)};/**
   * Resets the current date to the current moment.
   * @returns {void}
   */const handleResetCurrentDate=()=>{const date=(0,_moment.default)();setSelectedCellDate(date);setCurrentDate(date);setInputFormatted(date);setVisibleDropDown(null)};/**
   * Handles the validation of the input value and updates the state accordingly.
   * @returns {void}
   */const handleInputValidation=()=>{if(!inputValue){// setCurrentDate(null);
setSelectedCellDate(null);return}const inputDate=(0,_moment.default)(inputValue,mergedOptions.format,false);const newDate=inputDate.isValid()?inputDate:(0,_moment.default)();setCurrentDate(newDate);setSelectedCellDate(newDate);setInputFormatted(newDate)};/**
   * Handles the click event on a calendar cell.
   * @param {HTMLElement} targetElement target of The click event.
   * @param {moment.Moment} selectedDate - The date associated with the clicked cell.
   * @returns {void}
   */const handleCalendarCellClick=(targetElement,selectedDate)=>{if(targetElement.classList.contains("disabled-cell")){return}if(mergedOptions.onChange){mergedOptions.onChange(selectedDate)}if(!selectedCellDate||!selectedCellDate.isSame(selectedDate)){setInputFormatted(selectedDate);setSelectedCellDate(selectedDate);setVisibleDropDown(null);// Hiding the DatePicker after selecting a day
if(datePickerRef.current){datePickerRef.current.classList.add("hide")}}};const handleInputChange=event=>{const inputValue=event.target.value;setInputValue(inputValue);if(mergedOptions.onChange&&inputValue===""){mergedOptions.onChange(null)}};return/*#__PURE__*/_react.default.createElement("div",{ref:componentContainerRef},/*#__PURE__*/_react.default.createElement("input",{ref:inputRef,type:"text",value:inputValue,name:name,id:id,className:"DateTimePicker__input",onChange:handleInputChange,onBlur:handleInputValidation,onKeyDown:e=>{if(e.key==="Enter"){handleInputValidation()}},onClick:()=>{if(datePickerRef.current&&inputRef.current){(0,_DatePickerUtils.updateDatePickerContainerPosition)(inputRef.current,datePickerRef.current);datePickerRef.current.classList.toggle("hide");setVisibleDropDown(null)}}}),mergedOptions.datepicker&&/*#__PURE__*/_react.default.createElement("div",{className:"DateTimePicker hide",ref:datePickerRef,role:"dialog"},/*#__PURE__*/_react.default.createElement("header",{className:"DateTimePicker__header ".concat(mergedOptions.rtl?"DateTimePicker__header--reversed":"")},/*#__PURE__*/_react.default.createElement(_IconButton.default,{icon:mergedOptions.rtl?_freeSolidSvgIcons.faCaretRight:_freeSolidSvgIcons.faCaretLeft,onClick:()=>handleChangeMonth(-1)}),/*#__PURE__*/_react.default.createElement(_IconButton.default,{icon:_freeSolidSvgIcons.faHouse,onClick:handleResetCurrentDate}),/*#__PURE__*/_react.default.createElement("div",{className:"DateTimePicker__header__month-year-menu"},/*#__PURE__*/_react.default.createElement(_DropDown.default,{name:"month",items:monthNameList,label:(0,_DatePickerUtils.getMonthName)(monthNameList,currentDate),onSelect:handleSelectMonth,isVisible:visibleDropDown==="month",setActiveDropDownName:setVisibleDropDown}),/*#__PURE__*/_react.default.createElement(_DropDown.default,{name:"year",items:yearList,label:currentDate.format("YYYY"),onSelect:handleSelectYear,isVisible:visibleDropDown==="year",setActiveDropDownName:setVisibleDropDown})),/*#__PURE__*/_react.default.createElement(_IconButton.default,{icon:mergedOptions.rtl?_freeSolidSvgIcons.faCaretLeft:_freeSolidSvgIcons.faCaretRight,onClick:()=>handleChangeMonth(1)})),/*#__PURE__*/_react.default.createElement("div",{className:"DateTimePicker__calendar"},/*#__PURE__*/_react.default.createElement("div",{className:"DateTimePicker__calendar__header"},dayNameList.map(day=>/*#__PURE__*/_react.default.createElement("div",{key:day.index},day.name))),/*#__PURE__*/_react.default.createElement("div",{className:"DateTimePicker__calendar__body"},calendarDayList.map(currentCellDate=>/*#__PURE__*/_react.default.createElement("div",{key:currentCellDate.index,className:(0,_DatePickerUtils.generateDayClasses)(selectedCellDate,currentCellDate,mergedOptions),onClick:event=>handleCalendarCellClick(event.target,currentCellDate.date)},currentCellDate.date.format("D")))))))};var _default=exports.default=DatePicker;