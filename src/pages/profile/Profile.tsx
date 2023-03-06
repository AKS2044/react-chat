import cl from './Profile.module.scss';
import photo from '../../images/photo2.png';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectLoginData } from '../../redux/Auth/selectors';
import { useEffect } from 'react';
import { fetchGetProfile } from '../../redux/Auth/asyncActions';
import { useAppDispatch } from '../../redux/store';
import Loader from '../../components/loader/Loader';
import { fetchCreateChat } from '../../redux/Chat/asyncActions';

const Profile = () => {
    const dispatch = useAppDispatch();
    const isAuth = useSelector(selectIsAuth);
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/login';
    const { profile, profileStatus, statusAuth } = useSelector(selectLoginData);
    
    const onClickLogout = () => {
        if(window.confirm("Do you really want to leave?"))
        {
            window.localStorage.removeItem('token');
            window.location.reload();
        }
    }
    
    const onClickCreateChat = async () => {
        const nameChat = prompt('Enter the name of the chat');
        if(nameChat)
        await dispatch(fetchCreateChat({nameChat: nameChat}));
        else
        window.alert("The field cannot be empty")
    }
    
    useEffect(() => {
        dispatch(fetchGetProfile());
    }, []);

    if(!isAuth && profileStatus === "error"){
        return <Navigate to={fromPage} />;
    }
    return (
        <>
        {profileStatus === "loading" && <Loader />}
        <div className={cl.container}>
            <div className={cl.profile}>
                <div onClick={onClickCreateChat} className={cl.profile__button}>Create chat</div>
                <div onClick={onClickLogout} className={`${cl.profile__button} ${cl.profile__button2}`}>Exit</div>
                {profileStatus === 'completed' &&
                <div className={cl.profile__block}>
                    <img src={`https://localhost:7275/${profile.pathPhoto}`} alt='Avatar' className={cl.profile__block__photo} />
                    <div className={cl.profile__block__info}>
                        <div className={cl.profile__block__info__text}>Login:</div>
                        <div className={cl.profile__block__info__text}>{profile.userName}</div>
                    </div>
                    <div className={cl.profile__block__info}>
                        <div className={cl.profile__block__info__text}>E-mail:</div>
                        <div className={cl.profile__block__info__text}>{profile.email}</div>
                    </div>
                    <div className={cl.profile__block__info}>
                        <div className={cl.profile__block__info__text}>Date register:</div>
                        <div className={cl.profile__block__info__text}>{profile.dateReg}</div>
                    </div>
                </div>}
                <div className={cl.profile__chat}>
                    <div className={cl.profile__chat__title}>List of chats</div>
                    <div className={cl.profile__chat__items}>
                        <Link to='/' className={cl.profile__chat__items__item}>
                            <img src={photo} alt='Avatar' className={cl.profile__chat__items__item__photo} />
                            <div className={cl.profile__chat__items__item__text}>Name chat</div>
                            <div className={cl.profile__chat__items__item__text}>20 users</div>
                            <div className={cl.profile__chat__items__item__text}>online: 3</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Profile;
