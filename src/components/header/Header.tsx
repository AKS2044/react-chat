import { Link } from 'react-router-dom';
import cl from './Header.module.scss';
import logout from '../../images/logout.svg'

type HeaderProps = {
    userName: string,
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <div className={cl.header}>
            <Link to='/' className={cl.header__link}>React Chat</Link>
            <div className={cl.header__title}>
                <div className={cl.header__title__welcome}>Welcome, <Link to='/profile' className={cl.header__title__welcome__profile}>{props.userName}</Link></div>
                <img src={logout} alt='Logout' title='Logout' className={cl.header__title__logout}/>
            </div>
        </div>
    );
};

export default Header;