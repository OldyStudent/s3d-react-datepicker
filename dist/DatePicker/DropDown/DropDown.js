"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=DropDown;require("./DropDown.css");var _react=_interopRequireWildcard(require("react"));var _freeSolidSvgIcons=require("@fortawesome/free-solid-svg-icons");var _reactFontawesome=require("@fortawesome/react-fontawesome");function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap,t=new WeakMap;return(_getRequireWildcardCache=function(e){return e?t:r})(e)}function _interopRequireWildcard(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=_getRequireWildcardCache(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var i=a?Object.getOwnPropertyDescriptor(e,u):null;i&&(i.get||i.set)?Object.defineProperty(n,u,i):n[u]=e[u]}return n.default=e,t&&t.set(e,n),n}/**
 * DropDown component for selecting items from a dropdown list.
 * @module DropDown
 * @param {Object} props - Component properties.
 * @param {string} props.label - The label of the DropDown.
 * @param {Array} props.items - The list of items to display in the DropDown.
 * @param {function} props.onSelect - Item selection handler.
 * @param {string} props.name - The name of the DropDown.
 * @param {boolean} props.isVisible - Indicates whether the DropDown is visible.
 * @param {function} props.setActiveDropDownName - Sets the name of the active DropDown.
 * @returns {JSX.Element} The DropDown component.
 */function DropDown(_ref){let{label,items,onSelect,name,isVisible,setActiveDropDownName}=_ref;const listRef=(0,_react.useRef)();/**
   * Handles the toggle of the dropdown list visibility.
   * @param {Event} event - The event object.
   */const handleToggleList=event=>{setActiveDropDownName(previousValue=>previousValue===name?null:name);event.stopPropagation()};/**
   * Handles the selection of an item in the list.
   * @param {Event} event - The event object.
   * @param {Object} item - The selected item.
   */const handleItemSelection=(event,item)=>{event.stopPropagation();onSelect(item.index)};// Scrolls the list to show the selected item in the center.
(0,_react.useEffect)(()=>{if(isVisible&&listRef.current&&label){const selectedElement=listRef.current.querySelector("[data-value=\"".concat(label,"\"]"));if(selectedElement){selectedElement.scrollIntoView({block:"center",behavior:"smooth"})}}},[label,isVisible]);return/*#__PURE__*/_react.default.createElement("div",{className:"DropDown",onClick:handleToggleList},label," ",/*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon,{icon:_freeSolidSvgIcons.faCaretDown,className:"DropDown__icon"}),isVisible&&/*#__PURE__*/_react.default.createElement("ul",{ref:listRef,className:"DropDown__list"},items.map(item=>/*#__PURE__*/_react.default.createElement("li",{key:item.index,onClick:event=>handleItemSelection(event,item),"data-value":item.value},item.value))))}