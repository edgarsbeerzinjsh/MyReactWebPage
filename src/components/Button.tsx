import "../styles/components/button.scss";

type ButtonProps = {
  onButtonClick?: () => void;
  variant?: "primary" | "secondary";
  children: JSX.Element | string;
  type?: "button" | "submit";
  id?: string;
};

export const Button = ({ onButtonClick, children, type="button", variant="primary", id }: ButtonProps) => {
  return (
    <button id={`${id}`} className={`button  ${variant}`} onClick={() => onButtonClick?.()}>
      {children}
    </button>
  );
};
