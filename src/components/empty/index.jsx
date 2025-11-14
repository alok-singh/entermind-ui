const Empty = (props) => {
  return (
    <div className={`text-center ${props.className ?? ''}`}>
      <div className="text-xs text-[#06f] mb-2">{props.title}</div>
      {props.description ? <div className="text-[#0f1419] text-xs">{props.description}</div> : null}
    </div>
  );
};

export default Empty;
