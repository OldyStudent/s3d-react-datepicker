import "./DropDown.css";
import React, { useEffect, useRef } from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
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
 */
export default function DropDown({
  label,
  items,
  onSelect,
  name,
  isVisible,
  setActiveDropDownName,
}) {
  const listRef = useRef();

  /**
   * Handles the toggle of the dropdown list visibility.
   * @param {Event} event - The event object.
   */
  const handleToggleList = (event) => {
    setActiveDropDownName((previousValue) =>
      previousValue === name ? null : name,
    );
    event.stopPropagation();
  };

  /**
   * Handles the selection of an item in the list.
   * @param {Event} event - The event object.
   * @param {Object} item - The selected item.
   */
  const handleItemSelection = (event, item) => {
    event.stopPropagation();
    onSelect(item.index);
  };

  // Scrolls the list to show the selected item in the center.
  useEffect(() => {
    if (isVisible && listRef.current && label) {
      const selectedElement = listRef.current.querySelector(
        `[data-value="${label}"]`,
      );

      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  }, [label, isVisible]);

  return (
    <div className="DropDown" onClick={handleToggleList}>
      {label} <FontAwesomeIcon icon={faCaretDown} className="DropDown__icon" />
      {isVisible && (
        <ul ref={listRef} className="DropDown__list">
          {items.map((item) => (
            <li
              key={item.index}
              onClick={(event) => handleItemSelection(event, item)}
              data-value={item.value}
            >
              {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
