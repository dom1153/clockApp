import SettingsText from "./SettingsText";

function SettingsGroup({title, options, selected}) {
  return (
    <div className="text-xl pb-3">
        <div className="pl-2 pb-1">{title}</div>
        {options && options.map(({id, name}) => (<SettingsText text={name}> selected={true}</SettingsText>))}
    </div>
  );
}

export default SettingsGroup;