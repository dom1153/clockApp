export default function UIButton({icon, imgDesc, onClick}) {
  return (
    <button className="fullscreen bg-gray-700 p-2 ml-1 mr-1 rounded-md opacity-50 hover:opacity-100" onClick={onClick}>
      <img src={icon} alt={imgDesc} />
    </button>
  );
}