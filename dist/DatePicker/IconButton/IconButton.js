"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=IconButton;require("./IconButton.css");var _reactFontawesome=require("@fortawesome/react-fontawesome");/**
 * IconButton component for displaying an icon button.
 * @module IconButton
 * @param {Object} props - Component properties.
 * @param {Object} props.icon - The icon to display within the button.
 * @param {function} props.onClick - Click event handler for the button.
 * @returns {JSX.Element} The IconButton component.
 */function IconButton(_ref){let{icon,onClick}=_ref;// Handles the click event on the IconButton.
const handleClick=event=>{onClick(event)};return/*#__PURE__*/React.createElement("div",{onClick:handleClick,className:"IconButton"},/*#__PURE__*/React.createElement(_reactFontawesome.FontAwesomeIcon,{icon:icon,className:"IconButton__button"}))}