import React, { useEffect, useState } from "react";
import "./CssFiles/CountdownDisplay.css";

function CountdownDisplay({ targetDate, onCancel }) {
  const calculateTimeLeft = () => {
    const difference = targetDate - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [countdownCompleted, setCountdownCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (Object.values(newTimeLeft).every((val) => val === 0)) {
        setCountdownCompleted(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    if (timeLeft.days > 100) {
      alert("Selected time is more than 100 days");
    }
  }, [timeLeft.days]);

  return (
    <div className="counter-container">
      <h1>
        Countdown <span>Timer</span>{" "}
      </h1>
      <button onClick={onCancel}>
        {countdownCompleted ? "Start Timer" : "Cancel Countdown"}
      </button>

      {countdownCompleted ? (
        <p className="countdownOverText">
          The countdown is over, what's next on your adventure?
        </p>
      ) : (
        <div className="time-display">
          <p>
            <span>{timeLeft.days}</span>
            Days
          </p>
          <p>
            <span>{timeLeft.hours} </span>
            Hours
          </p>
          <p>
            <span>{timeLeft.minutes} </span>
            Minutes
          </p>
          <p>
            <span>{timeLeft.seconds} </span>
            Seconds
          </p>
        </div>
      )}
    </div>
  );
}

export default CountdownDisplay;
