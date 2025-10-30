import { Loader } from 'lucide-react';

const Button = (props) => {
  const handleClick = () => {
    if (props.onClick && !props.isLoading) {
      props.onClick();
    }
  };
  return (
    <button type={props.type || 'submit'} onClick={handleClick} className={`rounded-xl cursor-pointer ${props.isLoading ? 'flex items-center' : ''} gap-2 ${props.className}`}>
      {props.isLoading ? <Loader width="14px" height="14px" className="animate-spin" /> : null}
      {props.children}
    </button>
  );
};

export default Button;
