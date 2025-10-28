const Card = (props) => {
  return (
    <div
      className={`hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] relative p-4 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] rounded-[14px] transition duration-500 w-full ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
