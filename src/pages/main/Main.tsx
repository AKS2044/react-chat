import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { selectIsAuth, selectLoginData } from "../../redux/Auth/selectors";
import cl from "./Main.module.scss";

const Main = () => {
  const { statusAuth } = useSelector(selectLoginData);
  const isAuth = useSelector(selectIsAuth);
  return (
    <>
      {statusAuth === "loading" && <Loader />}
      <div className={cl.main}>
        <div className={cl.main__left}>
          <div className={cl.main__left__title}>
            Welcome to the react chat app
          </div>
          <div className={cl.main__left__line}></div>
          <div className={cl.main__left__btns}>
            {isAuth ? (
              <Link to="register" className={cl.main__left__btns__btn}>
                Profile
              </Link>
            ) : (
              <>
                <Link to="login" className={cl.main__left__btns__btn}>
                  Log in
                </Link>
                <Link to="register" className={cl.main__left__btns__btn}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
