import cl from './Button.module.scss';

type ButtonProps = {
    disabled?: boolean,
    children: string,
};

const Button = (props: ButtonProps) => {
    return (
        <button className={cl.button}>{props.children}</button>
    );
};

export default Button;