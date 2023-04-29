import "./DigitalClock.css"

function DigitalClock({timeString, dateString}) {
  return (
    <div className="">
        <div className="clock-time text-center">{timeString}</div>
        <div className="clock-date text-center">{dateString}</div>
    </div>
  );
}

export default DigitalClock;