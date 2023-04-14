import { useEffect, useState } from "react";
import date from "date-and-time";
import UIButton from "./UiButton";
import SettingsBox from "./SettingsBox";
import "./App.css";

function App() {
  // const [[hour, minute, second], setTime] = useState(1);
  // epoch
  const [timeString, setTimeString] = useState("00:00:00");
  const [dateString, setDateString] = useState("Thursday Jan 1 1970");
  const [settingsVisible, showSettings] = useState(false);
  const [isFullscreen, setFullscreenState] = useState(false);

  function updateTime() {
    const now = new Date();
    setTimeString(date.format(now, "hh:mm:ss"));
    setDateString(date.format(now, "ddd MMM DD YYYY"));
  }

  useEffect(() => {
    updateTime();
    let ticker = setInterval(() => updateTime());
    setFullscreenState(document.fullscreenElement);
    return () => {
      clearInterval(ticker);
    };
  });

  function settingButtonHandler() {
    showSettings(!settingsVisible);
  }

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  return (
    <div className="App">
      <div className="flex justify-center flex-col content-center h-screen w-screen bg-gray-500 text-white select-none">
        <div id="header" className="flex p-3 w-screen justify-between">
          <div id="header-lhs">
            <UIButton icon="/information_line.svg" imgDesc="about"></UIButton>
          </div>
          <div id="header-mid"></div>
          <div id="header-rhs">
            <UIButton icon={isFullscreen ? "/fullscreen_exit_2_line.svg" : "/fullscreen_2_line.svg"} imgDesc="fullscreen" onClick={toggleFullScreen}></UIButton>
          </div>
        </div>
        <div id="content" className="self-center mt-auto mb-auto">
          <div className="clock-time text-center">{timeString}</div>
          <div className="clock-date text-center">{dateString}</div>
        </div>
        <div id="footer" className="flex p-3 w-screen justify-between content-center">
          <div id="footer-lhs" className="flex items-center">
            <div className="">&lt;Image Description Here&gt;</div>
          </div>
          <div id="footer-mid"></div>
          <div id="footer-rhs">
            <UIButton icon="/download_2_line.svg" imgDesc="download"></UIButton>
            <UIButton icon="/more_2_fill.svg" imgDesc="options" onClick={settingButtonHandler}></UIButton>
            {settingsVisible && <SettingsBox></SettingsBox>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;