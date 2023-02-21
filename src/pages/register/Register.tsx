import { Link } from 'react-router-dom';
import Button from '../../components/UI/button/Button';
import cl from './Register.module.scss';
import Input from '../../components/UI/input/Input';

const Register = () => {
    return (
        <div className={cl.login}>
            <div className={cl.login__title}>Register to the React Chat</div>
            <div className={cl.login__form}>
                <div className={cl.login__form__text}>Register</div>
                <Input placeholder={'Login'} type={'text'} />
                <Input placeholder={'E-mail'} type={'email'} />
                <Input placeholder={'Password'} type={'password'} />
                <Input placeholder={'Password confirm'} type={'password'} />
                <Button>Register</Button>
                <div className={cl.login__form__reg}>Log in: <Link to='/login' className={cl.login__form__reg__link}>Here</Link></div>
            </div>
        </div>
    );
};

export default Register;