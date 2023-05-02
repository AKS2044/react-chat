import { TypeButton } from "../../../enum/EnumButton";
import cl from "./Button.module.scss";

type ButtonProps = {
  disabled?: boolean;
  children: string;
  type?: TypeButton;
};

const Button = (props: ButtonProps) => {
  return (
    <button type={props.type} disabled={!props.disabled} className={cl.button}>
      {props.children}
    </button>
  );
};

export default Button;
