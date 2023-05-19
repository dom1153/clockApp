import { useState } from "react";
import PhotoCredit from "./PhotoCredit"
import UIButton from "./UiButton"
import SettingsBox from "./SettingsBox";
import settingsImg from "../assets/more_2_fill.svg"
import downloadImg from "../assets/download_2_line.svg"

const FORCE_OPEN_SETTINGS = false;

export default function Footer({digitalSettings, pexelPhoto, settingsClickHandler, bgStyle}) {
  const [settingsVisible, showSettings] = useState(false);

  function settingButtonHandler() {
    showSettings(!settingsVisible);
  }

  return (
    <>
        <div id="footer" className="flex p-3 w-screen justify-between content-center">
            <div id="footer-lhs" className="flex items-center">
                <div className="">{((pexelPhoto.img_url != "") && bgStyle) && <PhotoCredit img_url={pexelPhoto.img_url} photographer_name={pexelPhoto.photographer_name} photographer_url={pexelPhoto.photographer_url}/>}</div>
            </div>
            <div id="footer-mid">
                <></>
            </div>
            <div id="footer-rhs">
                {/* <UIButton icon="/download_2_line.svg" imgDesc="download"/> */}
                <UIButton
                    icon={settingsImg}
                    imgDesc="options"
                    onClick={settingButtonHandler}
                />
                {(settingsVisible || FORCE_OPEN_SETTINGS) && <SettingsBox digital={digitalSettings} mainHandler={settingsClickHandler}/>}
            </div>
        </div>
    </>
  )
}
