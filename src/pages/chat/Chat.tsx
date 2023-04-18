import cl from './Chat.module.scss';
import Button from '../../components/UI/button/Button';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import smile from '../../images/smile.svg';
import Header from '../../components/header/Header';
import Menu from '../../components/menu/Menu';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectLoginData } from '../../redux/Auth/selectors';
import Loader from '../../components/loader/Loader';
import reactStringReplace from 'react-string-replace';
import { useAppDispatch } from '../../redux/store';
import { 
    fetchAddMessageChat, 
    fetchDeleteMessage, 
    fetchEnterTheChat, 
    fetchGetChat, 
    fetchMessageList, 
    fetchUsersInChat } from '../../redux/Chat/asyncActions';
import { MessageParams } from '../../redux/Chat/types';
import { selectChatData } from '../../redux/Chat/selectors';
import Messages from '../../components/messages/Messages';

type MessageProps = {
    userName: string,
    chatName: string,
    message: string,
    dateWrite: string,
    pathPhoto: string
}

const Main = () => {
    const pathSmiles = [1,2,3,4,5,6,7,8,9];
    const { 
        handleSubmit, 
        formState: {}} = useForm<MessageProps>({
        mode: 'onChange'
    });

    const [ connection, setConnection ] = useState<HubConnection>();
    const [text, setText] = useState('');
    const [ connected, setConnected ] = useState<string[]>([]);
    const [ disconnected, setDisconnected ] = useState<string[]>([]);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [ chatik, setChatik ] = useState<MessageProps[]>([]);
    const [ connectedInfo, setConnectedInfo ] = useState(false);
    const [ smilesOpen, setSmilesOpen ] = useState(false);
    const [ watchAll, setWatchAll ] = useState(false);
    const [ disconnectedInfo, setDisconnectedInfo ] = useState(false);
    const dispatch = useAppDispatch();
    const params = useParams();
    const isAuth = useSelector(selectIsAuth);
    const { statusAuth, data } = useSelector(selectLoginData);
    const { 
        messages,
        chat,
        usersChat,
        statusDeleteMessage,
        statusLeaveChat,
        statusEnterChat,
        statusGetChat  } = useSelector(selectChatData);
    const latestChat = useRef<MessageProps[]>([]);
    const dateNow = Date.now();
    const date = new Date(dateNow);const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    latestChat.current = chatik;
    const token = localStorage?.getItem('token');
    
    const getMessages = async () => {
        await dispatch(fetchMessageList({chatId: Number(params.id)}));
        await dispatch(fetchGetChat({chatId: Number(params.id)}));
        await dispatch(fetchUsersInChat({chatId: Number(params.id)}));
    }
    
    //Hub connection builder
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7275/chat', { accessTokenFactory: () => token ? token : 'Unauthorized', headers: {keys: 'ddd'} })
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
    }, []);
    
    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    connection.invoke('Enter', (groupName: 'sdad') => {
                        const info: string[] = [];
                        if(info){
                            setConnectedInfo(true);
                            //info.push(chatName);
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
    }, [statusDeleteMessage, statusLeaveChat, statusEnterChat]);
    
    useEffect(() => {
        function handleWindowResize() {
            setWindowWidth(window.innerWidth);
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const onChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>, set: React.Dispatch<React.SetStateAction<string>>) => {
        set(event.target.value);
    };

    const onClickJoinChat = async (chatId: number) => {
        await dispatch(fetchEnterTheChat({userId: data.id, chatId: chatId}));
    }
    
    const onSubmit = async () => {
        const message: MessageParams = {
            id: 0,
            chatId: Number(params?.id),
            userName: data.userName,
            chatName: chat.nameChat,
            message: text,
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
        setText('');
    }
    
    if(!isAuth && statusAuth === "error"){
        return <Navigate to='login' />;
    }
    return (
        <>
            {statusAuth === "completed"
            ? <>
            <Header 
            userName={data.userName}
            chatName={chat.nameChat}
            chatId={chat.id}
            userId={data.id} />
            <div className={cl.panel}>
                <div className={cl.panel__members}>members: {usersChat.length}</div>
                <div className={cl.panel__all} onClick={() => setWatchAll(!watchAll)}>{watchAll ? '⛌' : 'Watch all'}</div>
            </div>
            <div className="container">
                {(windowWidth > 670 || watchAll) && <Menu items={usersChat}/>}
                {(!watchAll || windowWidth > 670) && <div className={cl.container}>
                    <div className={cl.messages}>
                        <Messages {...messages} />
                        {/* {messages.map((m) => 
                            <div key={m.id} className={m.userName === data.userName ? `${cl.block} ${cl.block__your}`: `${cl.block}`}>
                            <div className={m.userName === data.userName ? `${cl.block__message} ${cl.message__your}`: `${cl.block__message}`}>
                                <div className={cl.block__message__name}>{m.userName}</div>
                                <div className={cl.block__message__text}>{reactStringReplace(m.message, /:(.+?):/g, (match, i) => (
                                    <img key={i} className={cl.text__block__emojies__emoji} alt='smile' src={`/assets/smiles/${match}.png`} />
                                ))}</div>
                                <div className={cl.block__message__date}>{m.dateWrite}</div>
                                {(m.userName === data.userName || data.roles.find((r) => r === "ADMIN")) 
                                && 
                                <span className={cl.block__message__delete} onClick={() => OnClickDeleteMessage(m.id)}>
                                    ⛌
                                </span>}
                            </div>
                                <img src={`https://localhost:7275/${m.pathPhoto}`} alt='User' className={cl.block__photo} />
                            </div>)}  */}
                        {/* {chatik.map((m, i) => 
                            <div key={i} className={m.userName === data.userName ? `${cl.block} ${cl.block__your}`: `${cl.block}`}>
                                <div className={m.userName === data.userName ? `${cl.block__message} ${cl.message__your}`: `${cl.block__message}`}>
                                    <div className={cl.block__message__name}>{m.userName}</div>
                                    <div className={cl.block__message__text}>{reactStringReplace(m.message, /:(.+?):/g, (match, i) => (
                                        <img key={i} className={cl.text__block__emojies__emoji} alt='smile' src={`/assets/smiles/${match}.png`} />
                                    ))}</div>
                                    <div className={cl.block__message__date}>{m.dateWrite}</div>
                                </div>
                                <img src={`https://localhost:7275/${m.pathPhoto}`} alt='Nickname' className={cl.block__photo} />
                            </div>)}
                        {connectedInfo && <>{connected.map((m, i) => 
                            <div key={i} className={cl.block}>
                                <div className={cl.block__message}>
                                    <div className={cl.block__message__name}>{m}</div>
                                </div>
                            </div>)}</>} */}
                        {disconnectedInfo && <>{disconnected.map((m, i) => 
                            <div key={i} className={cl.block}>
                                <div className={cl.block__message}>
                                    <div className={cl.block__message__name}>{m}</div>
                                </div>
                            </div>)}</>}
                        <form onSubmit={handleSubmit(onSubmit)} className={cl.text}>
                            {usersChat.find((u) => u.id === data.id) 
                            ?
                            <div className={cl.text__block}>
                                <textarea
                                className={cl.text__block__textarea}
                                ref={textAreaRef}
                                value={text}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChangeInput(e, setText)} />
                                <Button disabled={Boolean(text)}>Send</Button>
                                {windowWidth < 1000
                                ? <img 
                                className={cl.text__block__icon} 
                                src={smile} 
                                alt='Open smiles' 
                                title='Open smiles'
                                onClick={() => setSmilesOpen(!smilesOpen)} />
                                : <div className={cl.text__block__emojies}>
                                    {pathSmiles.map((n,i) =>
                                    <img 
                                    key={i} 
                                    className={cl.text__block__emojies__emoji} 
                                    alt='smile' 
                                    src={`/assets/smiles/smile${n}.png`}
                                    onClick={() => setText(text.concat(`:smile${n}:`))} />)}
                                </div>}
                            </div>
                            : 
                            <div 
                            onClick={() => onClickJoinChat(chat.id)} 
                            className={cl.text__join}
                            title='Enter the chat'>
                                Join to chat
                            </div>}
                            {(windowWidth < 1000 && smilesOpen) && 
                                <div className={cl.text__block__emojies}>
                                {pathSmiles.map((n,i) =>
                                <img 
                                key={i} 
                                className={cl.text__block__emojies__emoji} 
                                alt='smile' 
                                src={`/assets/smiles/smile${n}.png`}
                                onClick={() => setText(text.concat(`:smile${n}:`))} />)}
                            </div>}
                        </form>
                    </div>
                </div>}
            </div>
            </>
            : <Loader />}
        </>
    );
};

export default Main;