import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import photo from "../../images/morti.png";
import { selectLoginData } from "../../redux/Auth/selectors";
import cl from "./NotFound.module.scss";

const NotFound = () => {
  const { serverError } = useSelector(selectLoginData);
  return (
    <div className={cl.notfound}>
      <img className={cl.notfound__photo} src={photo} alt="Not found" />
      <div className={cl.notfound__text}>
        Return to{" "}
        <Link className={cl.notfound__link} to="/profile">
          profile
        </Link>
      </div>
      <div className={cl.notfound__text}>
        {serverError.message ? serverError.message : "Page is not found"} :(
      </div>
      <div className={cl.notfound__404}>
        {serverError.status ? serverError.status : 404}
      </div>
    </div>
  );
};

export default NotFound;
