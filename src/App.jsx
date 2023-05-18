import { useEffect, useState } from "react";
import date from "date-and-time";
import UIButton from "./UiButton";
import SettingsBox from "./SettingsBox";
import SettingsText from "./SettingsText";
import DigitalClock from "./DigitalClock";
import AnalogClock from "./AnalogClock";
// VVV image api
import { createClient } from 'pexels';
import "./App.css";
import PhotoCredit from "./photoCredit";

const FORCE_OPEN_SETTINGS = false;
const DEFAULT_MODE = "digital" // analogue
const DIGITAL_DEFAULT = { 
  seconds: "show",
  hours: "military", // 24, 12, meridiem
  dayOfWeek: "full",
  date: "DD",
  month: "short",
  year: "full",
  theme: "dark"
};
const DEBUG_MESSAGES = 0;

const PEXEL_KEY = '';
const USE_PEXEL = 0;

function App() {
  const [timeString, setTimeString] = useState("00:00:00");
  const [timeStringFmt, setTimeStringFmt] = useState("");
  const [dateString, setDateString] = useState("Thursday Jan 1 1970");
  const [dateStringFmt, setDateStringFmt] = useState("");
  const [settingsVisible, showSettings] = useState(false);
  const [isFullscreen, setFullscreenState] = useState(false);
  const [mainDisplay, setMainDisplay] = useState(DEFAULT_MODE);
  const [digitalSettings, setDigitalSettings] = useState(DIGITAL_DEFAULT);
  const [pexelPhoto, setPexelPhoto] = useState({
    img_url: "https://images.pexels.com/photos/16814271/pexels-photo-16814271.jpeg", 
    photographer_name: "Kubra K.", 
    photographer_url: "https://www.pexels.com/@hkubrakisa"
  });
  const [bgStyle, setBgStyle] = useState({});

  function updateTimeString() {
    console.log("> in update time");
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
    setTimeStringFmt(timeStr);

    if (DEBUG_MESSAGES && timeStringFmt != timeStr) {
      console.log(`   prev timeStr: ${timeStringFmt}`);
      console.log(`   new timeStr: ${timeStr}`);
    }
  }

  function updateDateString() {
    console.log("> in update date");
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
        dateStr += "";
        break;
    }
    dateStr += " ";

    // D, DD, DD/MM, MM/DD ; just don't mess it up forehead
    if (digitalSettings.date != "hide") {
      dateStr += digitalSettings.date;
      if (
        digitalSettings.date.includes("/") &&
        digitalSettings.year != "hide"
      ) {
        dateStr += "/";
      } else {
        dateStr += " ";
      }
    } // if hide, append nothing

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
    dateStr = dateStr.replace(/ +/g, " ");
    setDateStringFmt(dateStr);

    if (DEBUG_MESSAGES && dateStringFmt != dateStr) {
      console.log(`  prev dateStr: ${dateStringFmt}`);
      console.log(`   new dateStr: ${dateStr}`);
    }
  }

  function updateTime() {
    const now = new Date();
    if (mainDisplay === "digital")
    {
      setTimeString(date.format(now, timeStringFmt));
      setDateString(date.format(now, dateStringFmt));
    }
  }

  function updateSettings() {
    updateTimeString();
    updateDateString();

    // console.log(digitalSettings.theme);
    if (digitalSettings.theme == "image") {
      setBgStyle(true);
    } else {
      setBgStyle(false);
    }
  }

  function settingsClickHandler(e, grp, i) {
    let settings = digitalSettings;
    settings[grp] = i;
    setDigitalSettings(settings);
    updateSettings();
  }

  useEffect(() => {
    let ticker = setInterval(() => updateTime());

    return () => {
      clearInterval(ticker);
    };
  });

  // onCreate
  // get's called twice...
  useEffect(() => {
    updateSettings();
    if (USE_PEXEL)
    {
      const client = createClient(PEXEL_KEY);
      client.photos.curated({ per_page: 1 }).then(res => {
        let photo = res.photos[0];
        console.log(photo);
        setPexelPhoto({
          img_url: photo.src.original, 
          photographer_name: photo.photographer, 
          photographer_url: photo.photographer_url
        })
        // https://images.pexels.com/photos/16814271/pexels-photo-16814271.jpeg
      });
    }
  }, []);

  function settingButtonHandler() {
    showSettings(!settingsVisible);
  }

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreenState(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setFullscreenState(false);
    }
  }

  return (
    <div className="App">
      <div className="absolute top-0 left-0 bg-center bg-cover w-screen h-screen -z-10 bg-gray-500 ">
        <img className={`w-full h-full object-cover ${bgStyle ? "block" : "hidden"}`} src={pexelPhoto.img_url}/>
      </div>
      <div className="flex justify-center flex-col content-center h-screen w-screen text-white select-none">
        <div id="header" className="flex p-3 w-screen justify-between">
          <div id="header-lhs">
            <UIButton icon="/information_line.svg" imgDesc="about"></UIButton>
          </div>
          <div id="header-mid">
            <SettingsText text="Digital" selected={mainDisplay == "digital"}></SettingsText>
            {false && <SettingsText text="Analogue" selected={mainDisplay == "analogue"}></SettingsText> }
            {false && <SettingsText text="Calendar" selected={mainDisplay == "calendar"}></SettingsText>}
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
          {/* <img src={pexelPhoto.img_url} /> */}
        </div>
        <div id="footer" className="flex p-3 w-screen justify-between content-center">
          <div id="footer-lhs" className="flex items-center">
            <div className="">{(pexelPhoto.img_url != "") && <PhotoCredit img_url={pexelPhoto.img_url} photographer_name={pexelPhoto.photographer_name} photographer_url={pexelPhoto.photographer_url}/>}</div>
          </div>
          <div id="footer-mid"></div>
          <div id="footer-rhs">
            <UIButton icon="/download_2_line.svg" imgDesc="download"></UIButton>
            <UIButton
              icon="/more_2_fill.svg"
              imgDesc="options"
              onClick={settingButtonHandler}
            ></UIButton>
            {(settingsVisible || FORCE_OPEN_SETTINGS) && <SettingsBox digital={digitalSettings} mainHandler={settingsClickHandler}></SettingsBox>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
