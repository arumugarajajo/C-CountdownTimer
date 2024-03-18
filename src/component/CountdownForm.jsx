import React, { useState } from "react";
import "./CssFiles/CountdownForm.css";

function CountdownForm({ onSetTargetDate }) {
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("00:00");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetDateTime = new Date(`${dateInput}T${timeInput}`).getTime();
    const currentDate = new Date().getTime();

    if (targetDateTime < currentDate) {
      setErrorMessage("Past time is not allowed.");
    } else if (targetDateTime - currentDate > 100 * 24 * 60 * 60 * 1000) {
      setErrorMessage("Selected time is more than 100 days.");
    } else {
      setErrorMessage("");
      onSetTargetDate(targetDateTime);
    }

    if (errorMessage) {
      window.location.reload();
    }
  };

  return (
    <div className="form-container">
      <h1>
        Countdown <span>Timer</span>
      </h1>
      <form onSubmit={handleSubmit} className="form-row">
        <div className="inputDiv">
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            required
            id="date"
          />
          <input
            type="time"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            required
            id="time"
          />
        </div>
        <button type="submit">Start Timer</button>{" "}
        {errorMessage && (
          <strong className="errorMessage">{errorMessage}</strong>
        )}
      </form>
      {!errorMessage && (
        <div className="time-display">
          <p>
            <span>0</span>
            Days
          </p>
          <p>
            <span>0 </span>
            Hours
          </p>
          <p>
            <span>0</span>
            Minutes
          </p>
          <p>
            <span>0</span>
            Seconds
          </p>
        </div>
      )}
    </div>
  );
}

export default CountdownForm;
