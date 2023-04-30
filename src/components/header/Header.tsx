import { Link, Navigate, useNavigate } from 'react-router-dom';
import cl from './Header.module.scss';
import logout from '../../images/logout.svg'
import { useAppDispatch } from '../../redux/store';
import { fetchLeaveTheChat } from '../../redux/Chat/asyncActions';

type HeaderProps = {
    userName: string,
    chatName: string,
    chatId: number,
    userId: string
}

const Header: React.FC<HeaderProps> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const onClickLeaveChat = async () => {
        const checkAlert = window.confirm('Do you really want to leave the chat?');
        if(checkAlert){
            await dispatch(fetchLeaveTheChat({userId: props.userId, chatId: props.chatId}));
            navigate('/profile');
        }
    }
    return (
        <div className={cl.header}>
            <Link to='/' className={cl.header__link}>React Chat</Link>
            <div className={cl.header__title}>
                <div className={cl.header__title__welcome}>
                    Welcome,
                    <Link to='/profile' className={cl.header__title__welcome__profile}>{props.userName}</Link>
                    to {props.chatName}
                </div>
                <img src={logout} onClick={() => onClickLeaveChat()}  alt='Leave the chat' title='Leave the chat' className={cl.header__title__logout}/>
            </div>
        </div>
    );
};

export default Header;