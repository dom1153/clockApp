import { useEffect, useState } from "react";
import date from "date-and-time";
import "./App.css";

function App() {
  // const [[hour, minute, second], setTime] = useState(1);
  // epoch
  const [timeString, setTimeString] = useState("00:00:00");
  const [dateString, setDateString] = useState("Thursday Jan 1 1970");
  // options
  // show seconds
  // hour (24, 12, pm/am)
  // date  (hide, d, dd, dd/mm, mm/dd
  // day short full hide
  // month short full hide
  // year short full hide
  // image description show hide
  // image effect normal blure darken

  function updateTime() {
    const now = new Date();
    // TODO: add conditionals for user format
    setTimeString(date.format(now, "hh:mm:ss"));
    setDateString(date.format(now, "ddd MMM DD YYYY"));
  }

  useEffect(() => {
    updateTime();
    let ticker = setInterval(() => updateTime(), 1000);
    return () => {
      clearInterval(ticker);
    };
  });

  // Todo: Time can be a component
  // Todo: Date can be a component
  // Todo: put header/footer into component?
  // Todo: fullscreen button compnoent

  return (
    <div className="App">
      <div className="flex justify-center flex-col content-center h-screen w-screen bg-gray-500 text-white">
        <div id="header" className="flex p-3 w-screen justify-between">
          <div id="header-lhs"></div>
          <div id="header-mid"></div>
          <div id="header-rhs">
            <button className="">[fullscreen]</button>
          </div>
        </div>
        <div id="content" className="self-center mt-auto mb-auto">
          <div className="clock-time text-center">{timeString}</div>
          <div className="clock-date text-center">{dateString}</div>
        </div>
        <div id="footer" className="flex p-3 w-screen justify-between">
          <div id="footer-lhs">
            <button className="place-self-end">[about]</button>
          </div>
          <div id="footer-mid"></div>
          <div id="footer-rhs">
            <button className="">[download bg]</button>
            <button className="">[options]</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
