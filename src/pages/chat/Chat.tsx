import cl from "./Chat.module.scss";
import Button from "../../components/UI/button/Button";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import smile from "../../images/smile.svg";
import Header from "../../components/header/Header";
import Menu from "../../components/menu/Menu";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth, selectLoginData } from "../../redux/Auth/selectors";
import Loader from "../../components/loader/Loader";
import { useAppDispatch } from "../../redux/store";
import {
  fetchAddMessageChat,
  fetchEnterTheChat,
  fetchGetChat,
  fetchMessageList,
  fetchUsersInChat,
} from "../../redux/Chat/asyncActions";
import { MessageParams, UsersCheck } from "../../redux/Chat/types";
import { selectChatData } from "../../redux/Chat/selectors";
import Messages from "../../components/messages/Messages";

const Main = () => {
  const pathSmiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { handleSubmit } = useForm<MessageParams>({
    mode: "onChange",
  });

  const [users, setUsers] = useState<UsersCheck[]>([]);
  const [connection, setConnection] = useState<HubConnection>();
  const [text, setText] = useState("");
  const [connected, setConnected] = useState<string[]>([]);
  const [disconnected, setDisconnected] = useState<string[]>([]);
  const [chatik, setChatik] = useState<MessageParams[]>([]);
  const [connectedInfo, setConnectedInfo] = useState(false);
  const [smilesOpen, setSmilesOpen] = useState(false);
  const [watchAll, setWatchAll] = useState(false);
  const [disconnectedInfo, setDisconnectedInfo] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const latestChat = useRef<MessageParams[]>([]);
  latestChat.current = chatik;

  const dispatch = useAppDispatch();
  const params = useParams();
  const isAuth = useSelector(selectIsAuth);
  const { statusAuth, data } = useSelector(selectLoginData);
  const {
    messages,
    chat,
    usersChat,
    statusDeleteMessage,
    statusEnterChat,
    statusChatMes,
  } = useSelector(selectChatData);
  const dateNow = Date.now();
  const date = new Date(dateNow);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const token = localStorage?.getItem("token");

  const getMessages = async () => {
    await dispatch(fetchMessageList({ chatId: Number(params.id) }));
    await dispatch(fetchGetChat({ chatId: Number(params.id) }));
    await dispatch(fetchUsersInChat({ chatId: Number(params.id) }));
  };

  // Get messages
  useEffect(() => {
    getMessages();
  }, [statusDeleteMessage, statusChatMes, statusEnterChat]);

  //Hub connection builder
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7275/chat", {
        accessTokenFactory: () => (token ? token : "Unauthorized"),
      })
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);

  // Сonnection
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.invoke("OnConnectedAsync", "chat" + params.id);
        })
        .then(() => {
          connection.on("ConnectedAsync", (message) => {
            const info: string[] = [];
            if (info) {
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
          connection.on("SendCheckUsers", (message) => {
            setUsers(message);
          });
        })
        .then(() => {
          connection.on("DisconnectedAsync", (message) => {
            const info: string[] = [];
            setDisconnectedInfo(true);
            info.push(message);
            setDisconnected(info);
            const timer = setTimeout(() => {
              setDisconnectedInfo(false);
            }, 2000);
            return () => clearTimeout(timer);
          });
        })
        .then(() => {
          connection.on("ReceiveMessage", (message) => {
            const updatedChat: MessageParams[] = [...latestChat.current];
            updatedChat.push(message);
            setChatik(updatedChat);
          });
        })
        .catch((err) => console.log("Connection failed: ", err));

      return () => {
        connection.stop();
      };
    }
  }, [connection]);

  // Set messages in state "chatik" and map in Messages component
  useEffect(() => {
    if (messages.length) {
      setChatik(messages);
    }
  }, [messages]);

  //Check window width for mobile design
  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const onChangeInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    set: React.Dispatch<React.SetStateAction<string>>
  ) => {
    set(event.target.value);
  };

  const onClickJoinChat = async (chatId: number) => {
    await dispatch(fetchEnterTheChat({ userId: data.id, chatId: chatId }));
  };

  const onSubmit = async () => {
    const last = chatik.length
      ? chatik[chatik.length - 1]
      : messages[messages.length - 1];

    const message: MessageParams = {
      id: last.id + 1,
      chatId: Number(params?.id),
      userName: data.userName,
      chatName: chat.nameChat,
      message: text,
      dateWrite: date.toLocaleTimeString(),
      pathPhoto: data.pathPhoto,
    };

    await dispatch(fetchAddMessageChat(message));
    if (connection?.start) {
      try {
        await connection.send("SendMessage", message);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
    setText("");
  };

  if (!isAuth && statusAuth === "error") {
    return <Navigate to="/login" />;
  }
  return (
    <>
      {statusAuth === "completed" ? (
        <>
          <Header
            userName={data.userName}
            chatName={chat.nameChat}
            chatId={chat.id}
            userId={data.id}
          />
          <div className={cl.panel}>
            <div className={cl.panel__members}>members: {users.length}</div>
            <div
              className={cl.panel__all}
              onClick={() => setWatchAll(!watchAll)}
            >
              {watchAll ? "⛌" : "Watch all"}
            </div>
          </div>
          <div className="container">
            {(windowWidth > 670 || watchAll) && (
              <Menu users={users} items={usersChat} />
            )}
            {(!watchAll || windowWidth > 670) && (
              <div className={cl.container}>
                <div className={cl.chat}>
                  <Messages {...chatik} />
                  {connectedInfo && (
                    <>
                      {connected.map((m, i) => (
                        <div key={i} className={cl.chat__info}>
                          <div className={cl.chat__info__message}>{m}.....</div>
                        </div>
                      ))}
                    </>
                  )}
                  {disconnectedInfo && (
                    <>
                      {disconnected.map((m, i) => (
                        <div key={i} className={cl.block}>
                          <div className={cl.block__message__name}>{m}</div>
                        </div>
                      ))}
                    </>
                  )}
                  <form onSubmit={handleSubmit(onSubmit)} className={cl.text}>
                    {usersChat.find((u) => u.id === data.id) ? (
                      <div className={cl.text__block}>
                        <textarea
                          className={cl.text__block__textarea}
                          ref={textAreaRef}
                          value={text}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) => onChangeInput(e, setText)}
                        />
                        <Button disabled={Boolean(text)}>Send</Button>
                        {windowWidth < 1000 ? (
                          <img
                            className={cl.text__block__icon}
                            src={smile}
                            alt="Open smiles"
                            title="Open smiles"
                            onClick={() => setSmilesOpen(!smilesOpen)}
                          />
                        ) : (
                          <div className={cl.text__block__emojies}>
                            {pathSmiles.map((n) => (
                              <img
                                key={n}
                                className={cl.text__block__emojies__emoji}
                                alt="smile"
                                src={`/assets/smiles/smile${n}.png`}
                                onClick={() =>
                                  setText(text.concat(`:smile${n}:`))
                                }
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        onClick={() => onClickJoinChat(chat.id)}
                        className={cl.text__join}
                        title="Enter the chat"
                      >
                        Join to chat
                      </div>
                    )}
                    {windowWidth < 1000 && smilesOpen && (
                      <div className={cl.text__block__emojies}>
                        {pathSmiles.map((n, i) => (
                          <img
                            key={i}
                            className={cl.text__block__emojies__emoji}
                            alt="smile"
                            src={`/assets/smiles/smile${n}.png`}
                            onClick={() => setText(text.concat(`:smile${n}:`))}
                          />
                        ))}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Main;
