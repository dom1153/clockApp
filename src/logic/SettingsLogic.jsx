import { useState } from "react";
import date from "date-and-time";

const DEBUG_MESSAGES = 0;
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

const USE_DATE_OVERRIDE = 0;
const USE_TIME_OVERRIDE = 0;
const DATE_OVERRIDE = {
  year: 1970,
  month: 0,
  date: 1
};
const TIME_OVERRIDE = {
  hour: 9,
  minute: 27,
  second: 37
};

const SettingsLogic = () => {
  const [mainDisplay, setMainDisplay] = useState(DEFAULT_MODE);
  const [timeString, setTimeString] = useState("00:00:00");
  const [timeStringFmt, setTimeStringFmt] = useState("");
  const [dateString, setDateString] = useState("Thursday Jan 1 1970");
  const [dateStringFmt, setDateStringFmt] = useState("");
  const [digitalSettings, setDigitalSettings] = useState(DIGITAL_DEFAULT);
  const [bgStyle, setBgStyle] = useState({});

  function updateTimeString() {
    if (DEBUG_MESSAGES) console.log("> in update time");
    // consider time zone support?
    // meridiem (A)
    let timeStr = "";
    switch (digitalSettings.hours) {
      case "military":
        timeStr += "HH";
        break;
      case "sanmeridiem":
        timeStr += "h";
        break;
      default:
        // meridiem
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
    if (DEBUG_MESSAGES) console.log("> in update date");
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
    if (USE_TIME_OVERRIDE) {
      let {hour, minute, second} = TIME_OVERRIDE;
      // console.log("hms",hour,minute,second);
      now.setHours(hour);
      now.setMinutes(minute);
      now.setSeconds(second);
    }
    if (USE_DATE_OVERRIDE) {
      let {year, month, date} = DATE_OVERRIDE;
      console.log("ymd",year,month,date);
      now.setFullYear(year);
      now.setMonth(month);
      now.setDate(date);
    }

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

  return {
    updateSettings,
    settingsClickHandler,
    updateTime,
    digitalSettings,
    dateString,
    timeString,
    bgStyle,
    mainDisplay
  }
}

export default SettingsLogic;