import { Link } from 'react-router-dom';
import cl from './Header.module.scss';
import logout from '../../images/logout.svg'

const Header = () => {
    return (
        <div className={cl.header}>
            <Link to='/' className={cl.header__link}>React Chat</Link>
            <div className={cl.header__title}>
                <div className={cl.header__title__welcome}>Welcome Gena</div>
                <img src={logout} alt='Logout' title='Logout' className={cl.header__title__logout}/>
            </div>
        </div>
    );
};

export default Header;