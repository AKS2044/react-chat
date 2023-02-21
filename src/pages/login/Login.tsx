import { Link } from 'react-router-dom';
import Button from '../../components/UI/button/Button';
import Input from '../../components/UI/input/Input';
import cl from './Login.module.scss';

const Login = () => {
    return (
        <div className={cl.login}>
            <div className={cl.login__title}>Welcome to the React Chat</div>
            <div className={cl.login__form}>
                <div className={cl.login__form__text}>Log in</div>
                <Input placeholder={'Login'} type={'text'} />
                <Input placeholder={'Password'} type={'password'} />
                <div className={cl.login__form__rem}>
                    <div>Remember me</div>
                    <input type='checkbox' className={cl.login__form__rem__checkbox} />
                </div>
                <Button>Log in</Button>
                <div className={cl.login__form__reg}>Registration: <Link to='/register' className={cl.login__form__reg__link}>Here</Link></div>
            </div>
        </div>
    );
};

export default Login;