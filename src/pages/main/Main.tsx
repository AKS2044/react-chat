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
import { fetchAddMessageChat, fetchDeleteMessage, fetchGetChat, fetchMessageList, fetchUsersInChat } from '../../redux/Chat/asyncActions';
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
    const [ connected, setConnected ] = useState<string[]>([]);
    const [ disconnected, setDisconnected ] = useState<string[]>([]);
    const [ chatik, setChatik ] = useState<MessageProps[]>([]);
    const [ connectedInfo, setConnectedInfo ] = useState(false);
    const [ disconnectedInfo, setDisconnectedInfo ] = useState(false);
    const dispatch = useAppDispatch();
    const params = useParams();
    const isAuth = useSelector(selectIsAuth);
    const { statusAuth, data } = useSelector(selectLoginData);
    const { messages, usersChat  } = useSelector(selectChatData);
    const latestChat = useRef<MessageProps[]>([]);
    const dateNow = Date.now();
    const date = new Date(dateNow);
    
    latestChat.current = chatik;
    const token = localStorage?.getItem('token');

    const getMessages = async () => {
        await dispatch(fetchMessageList({chatId: Number(params.id)}));
        await dispatch(fetchGetChat({chatId: Number(params.id)}));
        await dispatch(fetchUsersInChat({chatId: Number(params.id)}));
    }
    
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7275/chat', { accessTokenFactory: () => token ? token : 'Unauthorized' })
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
    }, []);
    
    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    connection.on('ConnectedAsync', message => {
                        const info: string[] = [];
                        if(info){
                            setConnectedInfo(true);
                            info.push(message);
                            setConnected(info);
                            const timer = setTimeout(() => {
                                setConnectedInfo(false);
                            }, 2000);
                            return () => clearTimeout(timer);
                        }
                    });
                })
                .then(() => {
                    connection.on('DisconnectedAsync', message => {
                        const info: string[] = [];
                        if(info){
                            setDisconnectedInfo(true);
                            info.push(message);
                            setDisconnected(info);
                            const timer = setTimeout(() => {
                                setDisconnectedInfo(false);
                            }, 2000);
                            return () => clearTimeout(timer);
                        }
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
            <Header userName={data.userName} />
            <div className="container">
                <Menu items={usersChat}/>
                <div className={cl.container}>
                    {messages.map((m) => 
                        <div key={m.id} className={m.userName === data.userName ? `${cl.block} ${cl.block__your}`: `${cl.block}`}>
                        <div className={m.userName === data.userName ? `${cl.block__message} ${cl.message__your}`: `${cl.block__message}`}>
                            <div className={cl.block__message__name}>{m.userName}</div>
                            <div className={cl.block__message__text}>{m.message}</div>
                            <div className={cl.block__message__date}>{m.dateWrite}</div>
                        </div>
                            <img src={`https://localhost:7275/${m.pathPhoto}`} alt='User' className={cl.block__photo} />
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
                    {connectedInfo && <>{connected.map((m, i) => 
                        <div key={i} className={cl.block}>
                            <div className={cl.block__message}>
                                <div className={cl.block__message__name}>{m}</div>
                            </div>
                        </div>)}</>}
                    {disconnectedInfo && <>{disconnected.map((m, i) => 
                        <div key={i} className={cl.block}>
                            <div className={cl.block__message}>
                                <div className={cl.block__message__name}>{m}</div>
                            </div>
                        </div>)}</>}
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