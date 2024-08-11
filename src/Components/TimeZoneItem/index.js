import React from "react";
import moment from "moment-timezone";
import { FaTimes, FaArrowsAlt } from "react-icons/fa";
import './index.css'
const TimeZoneItem = ({ index, zone, selectedDate, onRemove, onReorder }) => {
  const formatDate = (date, zone) => {
    return moment.tz(date, zone).format("YYYY-MM-DD HH:mm:ss z");
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDrop = (e) => {
    const startIndex = e.dataTransfer.getData("index");
    const endIndex = index;
    onReorder(parseInt(startIndex), endIndex);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="timezone-item"
      draggable
      onDragStart={handleDragStart}
      onDragOver={allowDrop}
      onDrop={handleDrop}
    >
      <div className="timezone-info">
        <FaArrowsAlt className="drag-handle" />
        <span>{zone}</span>
        <span>{formatDate(selectedDate, zone)}</span>
      </div>
      <button onClick={() => onRemove(zone)}>
        <FaTimes />
      </button>
    </div>
  );
};

export default TimeZoneItem;
