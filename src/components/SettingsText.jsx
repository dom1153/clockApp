export default function SettingsText({text, selected, onClick = () => {}, id}) {
  return <span className={`text-base p-2 mr-2 opacity-70 hover:bg-gray-400 dark:hover:bg-gray-800 rounded-md cursor-pointer ${selected ? "bg-gray-400 dark:bg-gray-800" : ""}`} onClick={(e) => onClick(e, id)}>
    {text}
  </span>;
}