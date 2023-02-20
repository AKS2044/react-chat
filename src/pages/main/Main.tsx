import cl from './Main.module.scss';
import photo from '../../images/photo2.png';

const Main = () => {
    const message = [
        {photo: photo, message: 'Технически, однако, React - это библиотека JS, разработанная для создания пользовательских интерфейсов и их компонентов.', date: '20.02.2023 21:47'},
        {photo: photo, message: 'Технически, однако, React - это библиотека JS, разработанная для создания пользовательских интерфейсов и их компонентов.', date: '20.02.2023 21:47'},
        {photo: photo, message: 'Технически, однако, React - это библиотека JS, разработанная для создания пользовательских интерфейсов и их компонентов.', date: '20.02.2023 21:47'},
        {photo: photo, message: 'Технически, однако, React - это библиотека JS, разработанная для создания пользовательских интерфейсов и их компонентов.', date: '20.02.2023 21:47'},
        {photo: photo, message: 'Технически, однако, React - это библиотека JS, разработанная для создания пользовательских интерфейсов и их компонентов.', date: '20.02.2023 21:47'}
    ]
    return (
        <div className={cl.container}>
            {message.map((m, i) => 
                <div key={i} className={cl.block}>
                    <img src={m.photo} alt='Nickname' className={cl.block__photo} />
                    <div className={cl.block__message}>
                        <div className={cl.block__message__text}>{m.message}</div>
                        <div className={cl.block__message__date}>{m.date}</div>
                    </div>
                </div>)}

            {message.map((m, i) => 
                <div key={i} className={cl.block}>
                <div className={cl.block__message}>
                    <div className={cl.block__message__text}>{m.message}</div>
                    <div className={cl.block__message__date}>{m.date}</div>
                </div>
                    <img src={m.photo} alt='Nickname' className={cl.block__photo} />
                </div>)}
        </div>
    );
};

export default Main;