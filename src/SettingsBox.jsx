import SettingsGroup from "./SettingsGroup";
import { useEffect, useState } from "react";

const SECOND_OPTS = [ 
  ["show", "Show"],
  ["hide", "Hide"] 
];
const HOUR_OPTS = [
  ["military", "24"],
  ["sanmeridiem", "12"],
  ["meridiem", "12 + AM/PM"]
];
const DATE_OPTS = [ 
  ["hide", "Hide"],
  ["D", "D"],
  ["DD", "DD"],
  ["DD/MM", "DD/MM"],
  ["MM/DD", "MM/DD"]
 ];
const SHORTFULL_OPTS = [ 
  ["short", "Short"],
  ["full", "Full"],
  ["hide", "Hide"],
];
const THEME_OPTS = [ 
  ["sys", "System"],
  ["light", "Light"],
  ["dark", "Dark"],
  ["bing", "Bing Image"],
];
let BLANK_OPTS = [["", "blank"]];

function SettingsBox({digital, mainHandler}) {
  useEffect(() => {
    // something something reducer
    // update settings based on params
  });

  // so we have an array of options, and we want one to have a 'selected' state
  // and based on a selected state pass 
  // TODO: VVV render these as child elements instead, DOY?!

  let blankOpts = [ {id: 1, name: "empty"} ]

  function handler(e, grp, i) {
    mainHandler(e, grp, i);
  }

  return (
    <div className="backdrop-blur-md bg-green-700 p-5 rounded-lg absolute bottom-0 right-0 z-100 mb-16 mr-5 bg-opacity-80">
      <div className="flex">
        <div className="mr-5">
            {/* <SettingsGroup title="Theme" options={themeOpts}></SettingsGroup> */}
            <SettingsGroup title="Seconds" options={SECOND_OPTS} handler={handler} grp="seconds" settings={digital}></SettingsGroup>
            <SettingsGroup title="Hours" options={HOUR_OPTS} handler={handler} grp="hours" settings={digital}></SettingsGroup>
            <SettingsGroup title="Day" options={SHORTFULL_OPTS} handler={handler} grp="dayOfWeek" settings={digital}></SettingsGroup>
            <SettingsGroup title="Date" options={DATE_OPTS} handler={handler} grp="date" settings={digital}></SettingsGroup>
        </div>
        <div className="">
            <SettingsGroup title="Month" options={SHORTFULL_OPTS} handler={handler} grp="month" settings={digital}></SettingsGroup>
            <SettingsGroup title="Year" options={SHORTFULL_OPTS} handler={handler} grp="year" settings={digital}></SettingsGroup>
            {/* <SettingsGroup title="Image Description" options={BLANK_OPTS}></SettingsGroup>
            <SettingsGroup title="Image Effect" options={BLANK_OPTS}></SettingsGroup> */}
        </div>
      </div>
    </div>
  );
}

export default SettingsBox;