import cl from './Main.module.scss';
import Button from '../../components/UI/button/Button';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../../components/header/Header';
import Menu from '../../components/menu/Menu';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectLoginData } from '../../redux/Auth/selectors';
import Loader from '../../components/loader/Loader';
import { useAppDispatch } from '../../redux/store';
import { fetchAddMessageChat, fetchDeleteMessage, fetchGetChat, fetchMessageList } from '../../redux/Chat/asyncActions';
import { MessageParams } from '../../redux/Chat/types';
import { selectChatData } from '../../redux/Chat/selectors';

type MessageProps = {
    userName: string,
    message: string,
    dateWrite: string,
    pathPhoto: string
}

const Main = () => {
    const { 
        register, 
        handleSubmit, 
        formState: {isValid}} = useForm<MessageProps>({
        mode: 'onChange'
    });

    const [ connection, setConnection ] = useState<HubConnection>();
    const [ connected, setConnected ] = useState('');
    const [ chatik, setChatik ] = useState<MessageProps[]>([]);
    const dispatch = useAppDispatch();
    const params = useParams();
    const isAuth = useSelector(selectIsAuth);
    const { statusAuth, data } = useSelector(selectLoginData);
    const { messages, chat  } = useSelector(selectChatData);
    const latestChat = useRef<MessageProps[]>([]);
    const dateNow = Date.now();
    const date = new Date(dateNow);
    
    latestChat.current = chatik;

    const getMessages = async () => {
        await dispatch(fetchMessageList({chatId: Number(params.id)}));
        await dispatch(fetchGetChat({chatId: Number(params.id)}));
    }
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
                    connection.on('SendAsync', message => {
                        setConnected(message);
                        console.log(data)
                    });
                })
                .then(() => {
                    connection.on('ReceiveMessage', message => {
                        const updatedChat: MessageProps[] = [...latestChat.current];
                        updatedChat.push(message);
                        setChatik(updatedChat);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    useEffect(() => {
        getMessages();
    }, []);
    
    const OnClickDeleteMessage = (messageId: number) => {
        dispatch(fetchDeleteMessage({messageId}));
    }

    const onSubmit = async (values: MessageProps) => {
        const message: MessageParams = {
            id: 0,
            chatId: Number(params?.id),
            userName: data.userName,
            message: values.message,
            dateWrite: date.toLocaleTimeString(),
            pathPhoto: data.pathPhoto
        }
        await dispatch(fetchAddMessageChat(message));
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
                    {messages.map((m) => 
                        <div key={m.id} className={m.userName === data.userName ? `${cl.block} ${cl.block__your}`: `${cl.block}`}>
                        <div className={m.userName === data.userName ? `${cl.block__message} ${cl.message__your}`: `${cl.block__message}`}>
                            <div className={cl.block__message__name}>{m.userName}</div>
                            <div className={cl.block__message__text}>{m.message}</div>
                            <div className={cl.block__message__date}>{m.dateWrite}</div>
                        </div>
                            <img src={`https://localhost:7275/${m.pathPhoto}`} alt='Nickname' className={cl.block__photo} />
                            <span onClick={() => OnClickDeleteMessage(m.id)}>⛌</span>
                        </div>)} 
                    {chatik.map((m, i) => 
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