import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import Button from "../../components/UI/button/Button";
import { fetchLogin } from "../../redux/Auth/asyncActions";
import { selectIsAuth, selectLoginData } from "../../redux/Auth/selectors";
import { LoginParams } from "../../redux/Auth/types";
import { useAppDispatch } from "../../redux/store";
import instance from "../../axios";
import cl from "./Login.module.scss";
import Alert from "../../components/UI/alert/Alert";
import { TypeButton } from "../../enum/EnumButton";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/profile";
  const dispatch = useAppDispatch();

  const { data, statusLogin, error } = useSelector(selectLoginData);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginParams>({
    mode: "onChange",
  });

  const onSubmit = async (values: LoginParams) => {
    await dispatch(fetchLogin(values));
  };

  if (data.token) {
    window.localStorage.setItem("token", String(data.token));
  }

  useEffect(() => {
    if (statusLogin === "completed") {
      instance.defaults.headers.common["Authorization"] =
        window.localStorage.getItem("token");
    }
  }, [statusLogin]);
  console.log(error);
  if (isAuth) {
    return <Navigate to={fromPage} />;
  }
  return (
    <div className={cl.login}>
      <div className={cl.login__title}>Welcome to the React Chat</div>
      <form onSubmit={handleSubmit(onSubmit)} className={cl.login__form}>
        <div className={cl.login__form__text}>Log in</div>
        {statusLogin === "error" && (
          <>
            {error.map((e, i) => (
              <Alert key={i} severity="error">
                <strong>{e.message}</strong>
              </Alert>
            ))}
          </>
        )}
        <input
          className={cl.input}
          placeholder="Login"
          type="text"
          {...register("userName", { required: "Write your login" })}
        />
        {errors.userName?.message && (
          <span className={cl.login__error}>{errors.userName?.message}</span>
        )}
        <input
          className={cl.input}
          placeholder="password"
          type="password"
          autoComplete="on"
          {...register("password", { required: "Write your password" })}
        />
        {errors.password?.message && (
          <span className={cl.login__error}>{errors.password?.message}</span>
        )}
        <div className={cl.login__form__rem}>
          <div>Remember me</div>
          <input
            type="checkbox"
            className={cl.login__form__rem__checkbox}
            {...register("rememberMe")}
          />
        </div>
        <Button type={TypeButton.submit} disabled={isValid}>
          Log in
        </Button>
        <div className={cl.login__form__reg}>
          Registration:{" "}
          <Link to="/register" className={cl.login__form__reg__link}>
            Here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
