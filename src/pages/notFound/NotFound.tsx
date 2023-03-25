import { Link } from 'react-router-dom';
import photo from '../../images/morti.png';
import cl from './NotFound.module.scss';

const NotFound = () => {
    return (
        <div className={cl.notfound}>
            <img className={cl.notfound__photo} src={photo} alt='Not found'/>
            <div className={cl.notfound__text}>Return to <Link className={cl.notfound__link} to='/profile'>profile</Link></div>
            <div className={cl.notfound__text}>Page is not found :(</div>
            <div className={cl.notfound__404}>404</div>
        </div>
    );
};

export default NotFound;