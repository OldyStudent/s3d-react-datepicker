"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _moment=_interopRequireDefault(require("moment"));var _react=require("react");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}/**
 * Custom hook to generate calendar-related data based on the current date and options.
 * @param {moment.Moment} currentDate - The current date.
 * @param {Object} options - Configuration options for the calendar.
 * @returns {Object} - Calendar data including day names, month names, year list, and calendar day list.
 */const useCalendarData=(currentDate,options)=>{// Set the locale for moment.js based on the provided language option.
_moment.default.locale(options.lang);// Generate day name list using useMemo for memoization.
const dayNameList=(0,_react.useMemo)(()=>generateDayOfWeekNames(options),[options]);// Generate month name list using useMemo for memoization.
const monthNameList=(0,_react.useMemo)(()=>generateMonthNames(options),[options]);// Generate year list using useMemo for memoization.
const yearList=(0,_react.useMemo)(()=>generateYearList(options),[options]);// Generate calendar day list using useMemo for memoization.
const calendarDayList=(0,_react.useMemo)(()=>getCalendarMonthDays(currentDate,options.dayOfWeekStart,options.rtl),[currentDate,options]);// Return the generated calendar data.
return{dayNameList,monthNameList,yearList,calendarDayList}};/**
 * Generate an array of day names based on the provided options.
 * @param {Object} options - Configuration options for the calendar.
 * @returns {Array} - Array of day names.
 */function generateDayOfWeekNames(options){const firstDayOfWeek=options.dayOfWeekStart;const days=[];for(let j=0;j<7;j+=1){const dayIndex=(j+firstDayOfWeek)%7;days.push({index:dayIndex,name:options.i18n[options.lang].dayOfWeekShort[dayIndex]})}// Reverse the order of days if right-to-left is enabled.
if(options.rtl){return days.reverse()}return days}/**
 * Generate an array of month names based on the provided options.
 * @param {Object} options - Configuration options for the calendar.
 * @returns {Array} - Array of month names.
 */function generateMonthNames(options){return options.i18n[options.lang].months.map((month,index)=>({index,value:month}))}/**
 * Generate an array of years based on the provided options.
 * @param {Object} options - Configuration options for the calendar.
 * @returns {Array} - Array of years.
 */function generateYearList(options){const years=[];for(let i=options.yearStart;i<=options.yearEnd;i++){years.push({index:i,value:i})}return years}/**
 * Get the list of days in the calendar month based on the provided date and options.
 * @param {moment.Moment} date - The current date.
 * @param {number} firstDayOfWeek - The first day of the week index.
 * @param {boolean} rightToLeft - Whether the calendar is right-to-left.
 * @returns {Array} - List of days in the calendar month.
 */function getCalendarMonthDays(date){let firstDayOfWeek=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;let rightToLeft=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;// Ensure firstDayOfWeek is within the range [0, 6].
firstDayOfWeek=(firstDayOfWeek%7+7)%7;// Calculate the start and end of the month.
const startOfMonth=(0,_moment.default)(date).startOf("month");// Initialize the array to store days.
const days=[];let currentDay=startOfMonth.clone().add((firstDayOfWeek-startOfMonth.day()-7)%7,"days");// Iterate over days and populate the array.
for(let i=0;i<42;i++){days.push({index:currentDay.format("DDMMYYYY"),date:currentDay.clone(),isInCurrentMonth:currentDay.isSame(date,"month"),isCurrentDay:currentDay.isSame(new Date,"day")});currentDay.add(1,"day")}// Reverse the order of days if right-to-left is enabled.
if(rightToLeft){for(let i=0;i<days.length;i+=7){days.splice(i,7,...days.slice(i,i+7).reverse())}}return days}var _default=exports.default=useCalendarData;