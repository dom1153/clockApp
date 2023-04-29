import { useEffect, useState } from "react";
import date from "date-and-time";
import UIButton from "./UiButton";
import SettingsBox from "./SettingsBox";
import SettingsText from "./SettingsText";
import DigitalClock from "./DigitalClock";
import AnalogClock from "./AnalogClock";
import "./App.css";

const OPEN_SETTINGS = true;
const DEFAULT_MODE = "digital" // analogue
const DIGITAL_DEFAULT = { 
  seconds: "show",
  hours: "military", // 24, 12, meridiem
  dayOfWeek: "full",
  date: "DD",
  month: "short",
  year: "full"
};

function App() {
  // const [[hour, minute, second], setTime] = useState(1);
  // epoch
  const [timeString, setTimeString] = useState("00:00:00");
  const [dateString, setDateString] = useState("Thursday Jan 1 1970");
  const [settingsVisible, showSettings] = useState(false);
  const [isFullscreen, setFullscreenState] = useState(false);
  const [mainDisplay, setMainDisplay] = useState(DEFAULT_MODE);
  const [digitalSettings, setDigitalSettings] = useState(DIGITAL_DEFAULT);

  function updateTime() {
    const now = new Date();
    // TODO: (performance) read a global time string instead, and only update based on custom hook
    if (mainDisplay === "digital")
    {
      // consider time zone support?
      // meridiem (A)
      let timeStr = "";
      switch (digitalSettings.hours) {
        case "military":
          timeStr += "HH";
          break;
        default:
          // meridiem , 12
          timeStr += "hh";
          break;
      }

      timeStr += ":mm";

      switch (digitalSettings.seconds) {
        case "show":
          timeStr += ":ss";
          break;
        default:
          break;
      }

      if (digitalSettings.hours == "meridiem") {
        timeStr += " A";
      }

      let dateStr = "";
      switch (digitalSettings.dayOfWeek) {
        case "full":
          dateStr += "dddd";
          break;
        case "short":
          dateStr += "ddd";
          break;
        default: // hide
          break;
      }
      dateStr += " ";

      switch (digitalSettings.month) {
        case "full":
          dateStr += "MMMM";
          break;
        case "short":
          dateStr += "MMM";
          break;
        default: // hide
          break;
      }
      dateStr += " ";

      // D, DD, DD/MM, MM/DD ; just don't mess it up forehead
      dateStr += digitalSettings.date;
      if (digitalSettings.date.includes('/')) {
        dateStr += '/';
      } else {
        dateStr += " ";
      }

      switch (digitalSettings.year) {
        case "full":
          dateStr += "YYYY";
          break;
        case "short":
          dateStr += "YY";
          break;
        default: // hide
          break;
      }
      dateStr += " ";

      // lazy trim any extra whitespaces
      dateStr = dateStr.trim();
      dateStr = dateStr.replace(/ +/g, ' ');

      setTimeString(date.format(now, timeStr));
      setDateString(date.format(now, dateStr));
    }
  }

  function mainHandler(e, grp, i) {
    let settings = digitalSettings;
    settings[grp] = i;
    setDigitalSettings(settings);
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
          <div id="header-mid">
            <SettingsText text="Digital" selected={mainDisplay == "digital"}></SettingsText>
            <SettingsText text="Analogue" selected={mainDisplay == "analogue"}></SettingsText>
            <SettingsText text="Calendar" selected={mainDisplay == "calendar"}></SettingsText>
          </div>
          <div id="header-rhs">
            <UIButton
              icon={ isFullscreen ? "/fullscreen_exit_2_line.svg" : "/fullscreen_2_line.svg" }
              imgDesc="fullscreen"
              onClick={toggleFullScreen}>
            </UIButton>
          </div>
        </div>
        <div id="content" className="self-center mt-auto mb-auto">
          { (mainDisplay == "digital") && <DigitalClock timeString={timeString} dateString={dateString}></DigitalClock> }
          { (mainDisplay == "analogue") && <AnalogClock timeString={timeString} dateString={dateString}></AnalogClock> }
        </div>
        <div id="footer" className="flex p-3 w-screen justify-between content-center">
          <div id="footer-lhs" className="flex items-center">
            <div className="">&lt;Image Description Here&gt;</div>
          </div>
          <div id="footer-mid"></div>
          <div id="footer-rhs">
            <UIButton icon="/download_2_line.svg" imgDesc="download"></UIButton>
            <UIButton
              icon="/more_2_fill.svg"
              imgDesc="options"
              onClick={settingButtonHandler}
            ></UIButton>
            {(settingsVisible || OPEN_SETTINGS) && <SettingsBox digital={digitalSettings} mainHandler={mainHandler}></SettingsBox>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;