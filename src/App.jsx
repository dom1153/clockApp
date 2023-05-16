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

function App() {
  // const [[hour, minute, second], setTime] = useState(1);
  // epoch
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
          dateStr += "";
          break;
      }
      dateStr += " ";

      // D, DD, DD/MM, MM/DD ; just don't mess it up forehead
      if (digitalSettings.date != "hide") {
        dateStr += digitalSettings.date;
        if (digitalSettings.date.includes("/") && (digitalSettings.year != "hide")) {
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
      dateStr = dateStr.replace(/ +/g, ' ');

      if (0 && (timeStringFmt != timeStr) || (dateStringFmt != dateStr)) {
        console.log(`prev timeStr: ${timeStringFmt}, dateStr: ${dateStringFmt}`);
        console.log(` new timeStr: ${timeStr}, dateStr: ${dateStr}`);
      }
      setTimeStringFmt(timeStr);
      setTimeString(date.format(now, timeStringFmt));
      setDateStringFmt(dateStr);
      setDateString(date.format(now, dateStringFmt));

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

  useEffect(() => {
    // console.log(digitalSettings.theme);
    if (digitalSettings.theme == "image") {
      setBgStyle(true);
    } else {
      setBgStyle(false);
    }
  }, [digitalSettings.theme]);

  // onCreate
  useEffect(() => {
    if (0)
    {
      const client = createClient('');
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
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
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
            {(settingsVisible || FORCE_OPEN_SETTINGS) && <SettingsBox digital={digitalSettings} mainHandler={mainHandler}></SettingsBox>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;