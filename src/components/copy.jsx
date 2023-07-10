
export default ({
  size = 18,
  value,
  hide,
  className = "",
}) => {


  return (
    <div className="copy-capable" value={hide ? value : null}>
      {hide ? '' : value}</div>
  );
};