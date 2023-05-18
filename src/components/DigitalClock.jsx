import "../css/DigitalClock.css"
import React from 'react'

export default function DigitalClock({timeString, dateString}) {
  return (
    <div className="">
        <div className="clock-time text-center">{timeString}</div>
        <div className="clock-date text-center">{dateString}</div>
    </div>
  )
}