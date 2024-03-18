import React, { useState } from "react";
import "./App.css";
import CountdownDisplay from "./component/CountdownDisplay";
import CountdownForm from "./component/CountdownForm";
function App() {
  const [targetDate, setTargetDate] = useState(null);

  const handleSetTargetDate = (date) => {
    setTargetDate(date);
  };

  const handleCancelTimer = () => {
    setTargetDate(null);
  };

  return (
    <div className="App">
      <div className="counterTimer">
        {targetDate ? (
          <CountdownDisplay
            targetDate={targetDate}
            onCancel={handleCancelTimer}
          />
        ) : (
          <CountdownForm onSetTargetDate={handleSetTargetDate} />
        )}
      </div>
    </div>
  );
}

export default App;
