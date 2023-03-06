import cl from './Main.module.scss';
import photo from '../../images/photo2.png';
import Button from '../../components/UI/button/Button';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import Header from '../../components/header/Header';
import Menu from '../../components/menu/Menu';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectLoginData } from '../../redux/Auth/selectors';
import Loader from '../../components/loader/Loader';

type MessageProps = {
    userName: string,
    message: string,
    dateWrite: string,
    pathPhoto: string
}

const Main = () => {
    const message = [
        {photo: photo, message: 'Технически, однако, React - это библиотека JS, разработанная для создания пользовательских интерфейсов и их компонентов.', date: '20.02.2023 21:47'},
        {photo: photo, message: 'Технически, однако, React - это библиотека JS, разработанная для создания пользовательских интерфейсов и их компонентов.', date: '20.02.2023 21:47'},
        {photo: photo, message: 'Технически, однако, React - это библиотека JS, разработанная для создания пользовательских интерфейсов и их компонентов.', date: '20.02.2023 21:47'},
        {photo: photo, message: 'Технически, однако, React - это библиотека JS, разработанная для создания пользовательских интерфейсов и их компонентов.', date: '20.02.2023 21:47'},
        {photo: photo, message: 'Технически, однако, React - это библиотека JS, разработанная для создания пользовательских интерфейсов и их компонентов.', date: '20.02.2023 21:47'},
        {photo: photo, message: 'Технически, однако, React - это библиотека JS.', date: '20.02.2023 21:47'}
    ]

    const { 
        register, 
        handleSubmit, 
        formState: {isValid}} = useForm<MessageProps>({
        mode: 'onChange'
    });

    const [ connection, setConnection ] = useState<HubConnection>();
    const [ chat, setChat ] = useState<MessageProps[]>([]);
    const isAuth = useSelector(selectIsAuth);
    const { statusAuth, data } = useSelector(selectLoginData);
    const latestChat = useRef<MessageProps[]>([]);
    const dateNow = Date.now();
    const date = new Date(dateNow);
    
    latestChat.current = chat;

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7275/chat')
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
    }, []);
        
    console.log(chat, 'chat')
    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    connection.on('ReceiveMessage', message => {
                        const updatedChat: MessageProps[] = [...latestChat.current];
                        updatedChat.push(message);
                        
                        setChat(updatedChat);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const onSubmit = async (values: MessageProps) => {
        console.log(date)
        const message: MessageProps = {
            userName: data.userName,
            message: values.message,
            dateWrite: date.toLocaleTimeString(),
            pathPhoto: data.pathPhoto
        }
        if (connection?.start) {
            try {
                await connection?.send('SendMessage', message);
            }
            catch(e) {
                console.log(e);
            }
        }else {
            alert('No connection to server yet.');
        }
    }

    if(!isAuth && statusAuth === "error"){
        return <Navigate to='login' />;
    }
    return (
        <>
            {statusAuth === "completed"
            ? <>
            <Header />
            <div className="container">
                <Menu />
                <div className={cl.container}>
                    {message.map((m, i) => 
                        <div key={i} className={cl.block}>
                            <img src={m.photo} alt='Nickname' className={cl.block__photo} />
                            <div className={cl.block__message}>
                                <div className={cl.block__message__text}>{m.message}</div>
                                <div className={cl.block__message__date}>{m.date}</div>
                            </div>
                        </div>)} 
                    {chat.map((m, i) => 
                        <div key={i} className={m.userName === data.userName ? `${cl.block} ${cl.block__your}`: `${cl.block}`}>
                        <div className={m.userName === data.userName ? `${cl.block__message} ${cl.message__your}`: `${cl.block__message}`}>
                            <div className={cl.block__message__name}>{m.userName}</div>
                            <div className={cl.block__message__text}>{m.message}</div>
                            <div className={cl.block__message__date}>{m.dateWrite}</div>
                        </div>
                            <img src={`https://localhost:7275/${m.pathPhoto}`} alt='Nickname' className={cl.block__photo} />
                        </div>)}
                        <form onSubmit={handleSubmit(onSubmit)} className={cl.text}>
                            <div className={cl.text__block}>
                                <textarea
                                className={cl.text__block__textarea}
                                {...register('message')} />
                                <Button disabled={isValid}>Send</Button>
                            </div>
                        </form>
                </div>
            </div>
            </>
            : <Loader />}

        </>
    );
};

export default Main;