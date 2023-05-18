import { useState } from 'react'
import UIButton from './UiButton'

export default function FullScreenButton() {
  const [isFullscreen, setFullscreenState] = useState(false);

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
    <>
        <UIButton
            icon={ isFullscreen ? "/fullscreen_exit_2_line.svg" : "/fullscreen_2_line.svg" }
            imgDesc="fullscreen"
            onClick={toggleFullScreen}>
        </UIButton>
    </>
  )
}
