import SettingsGroup from "./SettingsGroup";
import AuthorSection from "./AuthorSection";
import { useEffect } from "react";

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
  // ["sys", "System"],
  ["light", "Light"],
  ["dark", "Dark"],
  ["image", "Pexel Image"],
];
let BLANK_OPTS = [["", "blank"]];

function SettingsBox({digital, mainHandler}) {
  useEffect(() => {
  });

  // so we have an array of options, and we want one to have a 'selected' state
  // and based on a selected state pass 
  // TODO: VVV render these as child elements instead, DOY?!

  function handler(e, grp, i) {
    mainHandler(e, grp, i);
  }

  // add inert when hidden?

  return (
    <div className="flex flex-col backdrop-blur-md bg-gray-200 dark:bg-green-700 rounded-t-lg absolute bottom-0 right-0 z-100 mb-16 mr-5 bg-opacity-70 max-h-[calc(100vh-(64px*2))] overflow-auto">
      {/* author/settings split */}
      <div className="flex flex-col">
        {/* actual settings */}
        <div className="flex flex-grow p-5 pb-2 md:flex-row flex-col overflow-auto">
          <div className="mr-5">
              <SettingsGroup title="Seconds" options={SECOND_OPTS} handler={handler} grp="seconds" settings={digital}></SettingsGroup>
              <SettingsGroup title="Hours" options={HOUR_OPTS} handler={handler} grp="hours" settings={digital}></SettingsGroup>
              <SettingsGroup title="Day" options={SHORTFULL_OPTS} handler={handler} grp="dayOfWeek" settings={digital}></SettingsGroup>
              <SettingsGroup title="Date" options={DATE_OPTS} handler={handler} grp="date" settings={digital}></SettingsGroup>
          </div>
          <div className="">
              <SettingsGroup title="Month" options={SHORTFULL_OPTS} handler={handler} grp="month" settings={digital}></SettingsGroup>
              <SettingsGroup title="Year" options={SHORTFULL_OPTS} handler={handler} grp="year" settings={digital}></SettingsGroup>
              <SettingsGroup title="Theme" options={THEME_OPTS} handler={handler} grp="theme" settings={digital}></SettingsGroup>
              {/* <SettingsGroup title="Image Description" options={BLANK_OPTS}></SettingsGroup>
              <SettingsGroup title="Image Effect" options={BLANK_OPTS}></SettingsGroup> */}
          </div>
        </div>
        <div className="dark:bg-gray-800 bg-gray-300 pl-7 pr-5 h-12 rounded-b-lg bg-opacity-70 flex items-center">
          <AuthorSection></AuthorSection>
        </div>
      </div>
    </div>
  );
}

export default SettingsBox;