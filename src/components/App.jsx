import { useEffect, useState } from "react";
import "../css/App.css";
import DigitalClock from "./DigitalClock";
import AnalogClock from "./AnalogClock";
import NavBar from "./NavBar";
import Footer from "./Footer";
import SettingsLogic from "../logic/SettingsLogic";
import ApiLogic from "../logic/ApiLogic";

const USE_PEXEL = 0;

function App() {
  const { 
    updateSettings, settingsClickHandler, updateTime, 
    dateString, timeString, bgStyle, mainDisplay
  } = SettingsLogic();
  const { 
    getCuratedPexelPhoto, 
    pexelPhoto 
  } = ApiLogic();

  useEffect(() => {
    let ticker = setInterval(() => updateTime());
    return () => clearInterval(ticker);
  });

  // onCreate, is called twice...
  useEffect(() => {
    updateSettings();
    if (USE_PEXEL) getCuratedPexelPhoto();
  }, []);

  return (
    <div className="App">
      <div className="absolute top-0 left-0 bg-center bg-cover w-screen h-screen -z-10 bg-gray-500 ">
        <img className={`w-full h-full object-cover ${bgStyle ? "block" : "hidden"}`} src={pexelPhoto.img_url}/>
      </div>
      <div className="flex justify-center flex-col content-center h-screen w-screen text-white select-none">
        <NavBar mainDisplay={mainDisplay}/>
        <div id="content" className="self-center mt-auto mb-auto">
          { (mainDisplay == "digital") && <DigitalClock timeString={timeString} dateString={dateString}></DigitalClock> }
          { (mainDisplay == "analogue") && <AnalogClock timeString={timeString} dateString={dateString}></AnalogClock> }
          {/* <img src={pexelPhoto.img_url} /> */}
        </div>
        <Footer pexelPhoto={pexelPhoto} settingsClickHandler={settingsClickHandler} />
      </div>
    </div>
  );
}

export default App;