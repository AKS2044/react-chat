import { Link, Navigate } from "react-router-dom";
import Button from "../../components/UI/button/Button";
import cl from "./Register.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth, selectLoginData } from "../../redux/Auth/selectors";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import { fetchRegister, fetchUploadPhoto } from "../../redux/Auth/asyncActions";
import { RegisterParams } from "../../redux/Auth/types";
import { useForm } from "react-hook-form";
import instance from "../../axios";
import Alert from "../../components/UI/alert/Alert";
import { TypeButton } from "../../enum/EnumButton";

const Register = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const formData = new FormData();
  const { data, statusRegister, error, urlPhoto, uploadPhotoStatus } =
    useSelector(selectLoginData);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterParams>({
    mode: "onBlur",
  });

  useEffect(() => {
    if (statusRegister === "completed") {
      instance.defaults.headers.common["Authorization"] =
        window.localStorage.getItem("token");
    }
  }, [statusRegister]);

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files![0];
      formData.append("file", file);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (values: RegisterParams) => {
    await dispatch(fetchRegister(values));
    if (formData.get("file")) {
      await dispatch(fetchUploadPhoto(formData));
    }
  };

  if (data.token) {
    window.localStorage.setItem("token", String(data.token));
  }

  if (isAuth) {
    return <Navigate to="/profile" />;
  }
  return (
    <div className={cl.register}>
      <div className={cl.register__title}>Register to the React Chat</div>
      <form onSubmit={handleSubmit(onSubmit)} className={cl.register__form}>
        <div className={cl.register__form__text}>Register</div>
        {statusRegister === "error" && (
          <>
            {error.map((e, i) => (
              <Alert key={i} severity="error">
                <strong>{e.message}</strong>
              </Alert>
            ))}
          </>
        )}
        <input
          placeholder="Login"
          type="text"
          className={cl.input}
          {...register("userName", { required: "enter a login" })}
        />
        {errors.userName?.message && (
          <span className={cl.register__error}>{errors.userName?.message}</span>
        )}
        <input
          placeholder="E-mail"
          type="email"
          className={cl.input}
          {...register("email", { required: "enter an email" })}
        />
        {errors.email?.message && (
          <span className={cl.register__error}>{errors.email?.message}</span>
        )}
        <input
          placeholder="Password"
          type="password"
          autoComplete="off"
          className={cl.input}
          {...register("password", { required: "Enter a password" })}
        />
        {errors.password?.message && (
          <span className={cl.register__error}>{errors.password?.message}</span>
        )}
        <input
          placeholder="Password confirm"
          type="password"
          autoComplete="off"
          className={cl.input}
          {...register("passwordConfirm", { required: "Password confirm" })}
        />
        {errors.passwordConfirm?.message && (
          <span className={cl.register__error}>
            {errors.passwordConfirm?.message}
          </span>
        )}
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeFile(e)
          }
          type="file"
          accept="image/*, .png, .jpg, .web"
        />
        <Button type={TypeButton.submit} disabled={isValid}>
          Register
        </Button>
        <div className={cl.register__form__reg}>
          Log in:{" "}
          <Link to="/login" className={cl.register__form__reg__link}>
            Here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
