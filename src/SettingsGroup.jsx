import SettingsText from "./SettingsText";

function SettingsGroup({title, options, handler, settings, grp}) {
  function middleMan(e, i) {
    handler(e, grp, i);
  }

  return (
    <div className="text-xl pb-3">
        <div className="pl-2 pb-1">{title}</div>
        {options && options.map(kv => (<SettingsText key={kv[0]} text={kv[1]} selected={settings[grp] === kv[0]} onClick={middleMan} id={kv[0]}></SettingsText>))}
    </div>
  );
}

export default SettingsGroup;