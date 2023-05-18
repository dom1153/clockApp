import UIButton from './UiButton'
import SettingsText from './SettingsText'
import FullScreenButton from './FullScreenButton'

export default function NavBar({mainDisplay}) {
  return (
    <>
        <div id="header" className="flex p-3 w-screen justify-between">
            <div id="header-lhs">
              <UIButton icon="/information_line.svg" imgDesc="about"/>
            </div>
            <div id="header-mid">
              <SettingsText text="Digital" selected={mainDisplay == "digital"} />
              {false && <SettingsText text="Analogue" selected={mainDisplay == "analogue"}/> }
              {false && <SettingsText text="Calendar" selected={mainDisplay == "calendar"}/>}
            </div>
            <div id="header-rhs">
                <FullScreenButton/>
            </div>
        </div>
    </>
  )
}
