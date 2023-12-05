"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=IconButton;require("./IconButton.css");var _react=_interopRequireDefault(require("react"));var _reactFontawesome=require("@fortawesome/react-fontawesome");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}/**
 * IconButton component for displaying an icon button.
 * @module IconButton
 * @param {Object} props - Component properties.
 * @param {Object} props.icon - The icon to display within the button.
 * @param {function} props.onClick - Click event handler for the button.
 * @returns {JSX.Element} The IconButton component.
 */function IconButton(_ref){let{icon,onClick}=_ref;// Handles the click event on the IconButton.
const handleClick=event=>{onClick(event)};return/*#__PURE__*/_react.default.createElement("div",{onClick:handleClick,className:"IconButton"},/*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon,{icon:icon,className:"IconButton__button"}))}