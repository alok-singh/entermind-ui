const Badge = (props) => {
  return (
    <div className={`${props.className} rounded-[7px] text-[10.5px] py-[1.75px] px-[7px]`}>{props.text}</div>
  );
};

export default Badge;
