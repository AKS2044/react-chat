import cl from './Main.module.scss';
import photo from '../../images/photo2.png';
import Button from '../../components/UI/button/Button';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import Header from '../../components/header/Header';
import Menu from '../../components/menu/Menu';
import { TypeButton } from '../../enum/EnumButton';

type MessageProps = {
    user: string,
    message: string
}

const defaultValues: MessageProps = {
    user: 'thefan',
    message: '',
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
        formState: {isValid}} = useForm({
        defaultValues,
        mode: 'onChange'
    });

    const [ connection, setConnection ] = useState<HubConnection>();
    const [ chat, setChat ] = useState<MessageProps[]>([]);
    const latestChat = useRef<MessageProps[]>([]);
    const date = new Date();
    
    latestChat.current = chat;

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7275/chat')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);
    
    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Connected!');
                    
                    connection.on('ReceiveMessage', message => {
                        console.log(latestChat);
                        const updatedChat: MessageProps[] = [...latestChat.current];
                        updatedChat.push(message);
                        
                        setChat(updatedChat);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const onSubmit = async (values: MessageProps) => {
        const message: MessageProps = {
            user: values.user,
            message: values.message
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
    return (
        <>
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
                    {message.map((m, i) => 
                        <div key={i} className={`${cl.block} ${cl.block__your}`}>
                        <div className={cl.block__message}>
                            <div className={cl.block__message__text}>{m.message}</div>
                            <div className={cl.block__message__date}>{m.date}</div>
                        </div>
                            <img src={m.photo} alt='Nickname' className={cl.block__photo} />
                        </div>)}
                    {chat.map((m, i) => 
                        <div key={i} className={`${cl.block} ${cl.block__your}`}>
                        <div className={cl.block__message}>
                            <div className={cl.block__message__text}>{m.message}</div>
                            <div className={cl.block__message__date}>12</div>
                        </div>
                            <img src={photo} alt='Nickname' className={cl.block__photo} />
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
    );
};

export default Main;