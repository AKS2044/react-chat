import cl from './Input.module.scss';

type InputProps = {
    placeholder?: string,
    autoComplete?: string,
    name?: string,
    type?: string,
    value?: string,
};

const Input = (props: InputProps) => {
    return (
        <input
        name={props.name} 
        value={props.value} 
        autoComplete={props.autoComplete} 
        placeholder={props.placeholder} 
        type={props.type} 
        className={cl.input} />
    );
};

export default Input;