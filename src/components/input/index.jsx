const Input = (props) => {
  return (
    <input
      onChange={props.onChange}
      value={props.value}
      type={props.type}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      {...(props.onClick ? { onClick: props.onClick } : {})}
      {...(props.onBlur ? { onBlur: props.onBlur } : {})}
      {...(props.required ? { required: true } : {})}
      className={`w-full text-[12.25px] p-4 rounded-[11px] bg-[#f5f5f7] focus-visible:outline-[3px] focus-visible:outline-[#2563eb80] ${props.className}`}
      {...(props.required ? { required: true } : {})}
    />
  );
};

export default Input;
