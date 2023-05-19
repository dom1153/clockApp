import { useState } from 'react'
import UIButton from './UiButton'
import fullscreenOpen from '../assets/fullscreen_2_line.svg'
import fullscreenClose from '../assets/fullscreen_exit_2_line.svg'

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
            icon={ isFullscreen ? fullscreenClose : fullscreenOpen }
            imgDesc="fullscreen"
            onClick={toggleFullScreen}>
        </UIButton>
    </>
  )
}
