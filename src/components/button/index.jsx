const Button = (props) => {
  return (
    <button type={props.type || 'submit'} className={`rounded-xl cursor-pointer ${props.className}`} {...(props.onClick ? { onClick: props.onClick } : {})}>
      {props.children}
    </button>
  );
};

export default Button;
