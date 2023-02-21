import cl from './Input.module.scss';

type InputProps = {
    placeholder?: string,
    type: string,
};

const Input = (props: InputProps) => {
    return (
        <input placeholder={props.placeholder} type={props.type} className={cl.input} />
    );
};

export default Input;