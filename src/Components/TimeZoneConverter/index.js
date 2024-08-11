import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import "./index.css";
import TimeZoneItem from "../TimeZoneItem/index.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlus, FaRegMoon, FaSun, FaCalendarAlt } from "react-icons/fa";

const defaultTimeZones = [
  "UTC",
  "Asia/Kolkata", 
  "America/New_York", 
  "America/Los_Angeles", 
];

const  TimeZoneConverter = () => {
  const [timeZones, setTimeZones] = useState(defaultTimeZones);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  const handleAddTimeZone = () => {
    const newZone = prompt("Enter Timezone (e.g., Europe/London):");
    if (newZone && moment.tz.zone(newZone)) {
      setTimeZones([...timeZones, newZone]);
    } else {
      alert("Invalid Timezone");
    }
  };

  const handleRemoveTimeZone = (zone) => {
    setTimeZones(timeZones.filter((tz) => tz !== zone));
  };

  const handleReorderTimeZones = (startIndex, endIndex) => {
    const result = Array.from(timeZones);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setTimeZones(result);
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleReverseOrder = () => {
    setTimeZones([...timeZones].reverse());
  };

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#f4f4f4";
    document.body.style.color = darkMode ? "#ffffff" : "#000000";
  }, [darkMode]);

  const CustomDatePickerInput = ({ value, onClick }) => {
    return (
      <button className="custom-input" onClick={onClick}>
        <FaCalendarAlt style={{ marginRight: "8px" }} />
        {value}
      </button>
    );
  };

  const handleScheduleMeet = () => {
    const startTime = moment(selectedDate).format("YYYYMMDDTHHmmss");
    const endTime = moment(selectedDate)
      .add(2, "hours")
      .format("YYYYMMDDTHHmmss");

    const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=Scheduled+Meeting&dates=${startTime}/${endTime}&details=Google+Meet+scheduled+using+Time+Zone+Converter&location=&trp=true&sprop=`;

    window.open(calendarUrl, "_blank");
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <h1 className="heading">Time Zone Converter</h1>
      <div className="controls">
        <div className="date-picker-container">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={15}
            dateFormat="MMM d, yyyy h:mm aa"
            customInput={<CustomDatePickerInput />}
          />
        </div>
        <button onClick={handleAddTimeZone}>
          <FaPlus /> Add Timezone
        </button>
        <button onClick={handleReverseOrder}>Reverse Order</button>
        <button onClick={handleToggleDarkMode}>
          {darkMode ? <FaSun /> : <FaRegMoon />}{" "}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="timezone-list">
        {timeZones.map((zone, index) => (
          <TimeZoneItem
            key={zone}
            index={index}
            zone={zone}
            selectedDate={selectedDate}
            onRemove={handleRemoveTimeZone}
            onReorder={handleReorderTimeZones}
          />
        ))}
      </div>
      <button className="schedule-meet" onClick={handleScheduleMeet}>
        Schedule Meet
      </button>
    </div>
  );
}

export default TimeZoneConverter;
