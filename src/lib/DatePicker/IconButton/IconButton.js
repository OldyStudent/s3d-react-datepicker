import "./IconButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * IconButton component for displaying an icon button.
 * @module IconButton
 * @param {Object} props - Component properties.
 * @param {Object} props.icon - The icon to display within the button.
 * @param {function} props.onClick - Click event handler for the button.
 * @returns {JSX.Element} The IconButton component.
 */
export default function IconButton({ icon, onClick }) {
  // Handles the click event on the IconButton.
  const handleClick = (event) => {
    onClick(event);
  };

  return (
    <div onClick={handleClick} className="IconButton">
      <FontAwesomeIcon icon={icon} className="IconButton__button" />
    </div>
  );
}
