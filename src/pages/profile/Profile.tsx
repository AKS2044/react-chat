import cl from './Profile.module.scss';
import photo from '../../images/photo2.png';
import { Link } from 'react-router-dom';

const Profile = () => {
    return (
        <div className={cl.container}>
            <div className={cl.profile}>
                <div className={cl.profile__button}>Create chat</div>
                <div className={`${cl.profile__button} ${cl.profile__button2}`}>Exit</div>
                <div className={cl.profile__block}>
                    <img src={photo} alt='Avatar' className={cl.profile__block__photo} />
                    <div className={cl.profile__block__info}>
                        <div className={cl.profile__block__info__text}>Login:</div>
                        <div className={cl.profile__block__info__text}>Alss</div>
                    </div>
                    <div className={cl.profile__block__info}>
                        <div className={cl.profile__block__info__text}>E-mail:</div>
                        <div className={cl.profile__block__info__text}>Alss@gmail.com</div>
                    </div>
                    <div className={cl.profile__block__info}>
                        <div className={cl.profile__block__info__text}>Date register:</div>
                        <div className={cl.profile__block__info__text}>21.02.2023</div>
                    </div>
                </div>
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
    );
};

export default Profile;