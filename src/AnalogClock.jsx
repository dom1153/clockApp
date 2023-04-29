import "./AnalogClock.css"

let hourNumbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
//              12
//          11      1
//      10              2
//  9                       3
//      8               4
//          7       5
//              6

function AnalogClock({timeString, dateString}) {
  return (
    <div id="clockface" className="flex justify-center relative bg-gray-100 clock-border rounded-full border-8 border-gray-600 text-black text-2xl">
        <div className="clockAxis">
            {[...Array(12).keys()].map((id) => (<div key={id*100} className="digit">{id+1}</div>))}
            {[...Array(60).keys()].map((id) => (<div key={id} className="tick"></div>))}
        </div>
    </div>
  );
}

export default AnalogClock;