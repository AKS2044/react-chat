import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import Button from '../../components/UI/button/Button';
import Input from '../../components/UI/input/Input';
import { fetchLogin } from '../../redux/Auth/asyncActions';
import { selectIsAuth, selectLoginData } from '../../redux/Auth/selectors';
import { LoginParams } from '../../redux/Auth/types';
import { useAppDispatch } from '../../redux/store';
import instance from '../../axios';
import cl from './Login.module.scss';
import Alert from '../../components/UI/alert/Alert';
import { TypeButton } from '../../enum/EnumButton';
import { TextField } from '@mui/material';

const defaultValues: LoginParams = {
    userName: '',
    password: '',
    rememberMe: false,
}

const Login = () => {
    const isAuth = useSelector(selectIsAuth);
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/';
    const dispatch = useAppDispatch();

    const { data, statusLogin, error } = useSelector(selectLoginData);
    const { 
        register, 
        handleSubmit, 
        formState: {errors, isValid}} = useForm<LoginParams>({
        mode: 'onChange'
    });
    
    const onSubmit = async (values: LoginParams) => {
        console.log(values)
            await dispatch(fetchLogin(values));
    }
        
    if(data.token){
        window.localStorage.setItem('token', String(data.token))
    }

    useEffect(() => {
        if(statusLogin === 'completed'){
            instance.defaults.headers.common['Authorization'] = window.localStorage.getItem('token');
        }
        }, [statusLogin]);

    if(isAuth){
        return <Navigate to='/profile' />;
    }
    return (
        <div className={cl.login}>
            <div className={cl.login__title}>Welcome to the React Chat</div>
            {statusLogin === 'error' && <>{error.map((e, i) => <Alert key={i} severity="error">
                    <strong>{e.message}</strong>
                    </Alert>)}</>}
            <form onSubmit={handleSubmit(onSubmit)} className={cl.login__form}>
                <div className={cl.login__form__text}>Log in</div>
                <TextField
                label="Login"
                error={Boolean(errors.userName?.message)}
                helperText={errors.userName?.message}
                {...register('userName', {required: 'Write your login '})}  />
                <TextField 
                label="Password"
                type="password"
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                autoComplete="on"
                {...register('password', {required: 'Write your password'})} />
                <div className={cl.login__form__rem}>
                    <div>Remember me</div>
                    <input type='checkbox' className={cl.login__form__rem__checkbox} />
                </div>
                <Button type={TypeButton.submit} disabled={false}>Log in</Button>
                <div className={cl.login__form__reg}>Registration: <Link to='/register' className={cl.login__form__reg__link}>Here</Link></div>
            </form>
        </div>
    );
};

export default Login;