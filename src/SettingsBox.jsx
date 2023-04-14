import SettingsGroup from "./SettingsGroup";

function SettingsBox() {
  let themeOpts = [
    { id: 1, name: "System" },
    { id: 2, name: "Light" },
    { id: 3, name: "Dark" },
    { id: 4, name: "Bing Image" },
  ];
  let secondOpts = [
    { id: 1, name: "Show" },
    { id: 2, name: "Hide" },
  ];
  let hourOpts = [
    { id: 1, name: "24" },
    { id: 2, name: "12" },
    { id: 3, name: "12 + AM/PM" },
  ];
  let dateOpts = [
    { id: 1, name: "Hide" },
    { id: 2, name: "D" },
    { id: 3, name: "DD" },
    { id: 3, name: "DD/MM" },
    { id: 3, name: "MM/DD" },
  ];
  let dayOpts = [
    { id: 1, name: "Short" },
    { id: 2, name: "Full" },
    { id: 3, name: "Hide" },
  ];
  let monthOpts = [
    { id: 1, name: "Short" },
    { id: 2, name: "Full" },
    { id: 3, name: "Hide" },
  ];
  let yearOpts = [
    { id: 1, name: "Short" },
    { id: 2, name: "Full" },
    { id: 3, name: "Hide" },
  ];
  let blankOpts = [ {id: 1, name: "empty"} ]
  return (
    <div className="backdrop-blur-md bg-green-700 p-5 rounded-lg absolute bottom-0 right-0 z-100 mb-16 mr-5 bg-opacity-80">
      <div className="flex">
        <div className="mr-5">
            {/* <SettingsGroup title="Theme" options={themeOpts}></SettingsGroup> */}
            <SettingsGroup title="Seconds" options={secondOpts}></SettingsGroup>
            <SettingsGroup title="Hours" options={hourOpts}></SettingsGroup>
            <SettingsGroup title="Day" options={dayOpts}></SettingsGroup>
        </div>
        <div className="">
            <SettingsGroup title="Month" options={monthOpts}></SettingsGroup>
            <SettingsGroup title="Year" options={yearOpts}></SettingsGroup>
            {/* <SettingsGroup title="Image Description" options={blankOpts}></SettingsGroup> */}
            {/* <SettingsGroup title="Image Effect" options={blankOpts}></SettingsGroup> */}
        </div>
      </div>
    </div>
  );
}

export default SettingsBox;