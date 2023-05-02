import cl from "./Profile.module.scss";
import photo from "../../images/photo2.png";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth, selectLoginData } from "../../redux/Auth/selectors";
import { useEffect, useRef, useState } from "react";
import { fetchGetProfile } from "../../redux/Auth/asyncActions";
import { useAppDispatch } from "../../redux/store";
import Loader from "../../components/loader/Loader";
import {
  fetchChatsUser,
  fetchCreateChat,
  fetchEnterTheChat,
  fetchLeaveTheChat,
  fetchSearchChat,
} from "../../redux/Chat/asyncActions";
import { AddChatParams } from "../../redux/Chat/types";
import { selectChatData } from "../../redux/Chat/selectors";

const Profile = () => {
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const location = useLocation();
  const params = useParams();
  const whoseProfile = Boolean(params.user);
  const fromPage = location.state?.from?.pathname || "/login";
  const { profile, profileStatus, data, statusAuth } =
    useSelector(selectLoginData);
  const {
    userChats,
    statusUserChats,
    searchChat,
    statusSearchChat,
    statusEnterChat,
    statusLeaveChat,
  } = useSelector(selectChatData);

  const onClickLogout = () => {
    if (window.confirm("Do you really want to leave?")) {
      window.localStorage.removeItem("token");
      window.location.reload();
    }
  };

  const onClickCreateChat = async () => {
    const nameChat = prompt("Enter the name of the chat");
    if (nameChat) {
      const chat: AddChatParams = { nameChat: nameChat };
      await dispatch(fetchCreateChat(chat));
    } else window.alert("The field cannot be empty");
  };

  const onClickJoinChat = async (chatId: number) => {
    await dispatch(fetchEnterTheChat({ userId: data.id, chatId: chatId }));
  };

  const onClickLeaveChat = async (chatId: number) => {
    await dispatch(fetchLeaveTheChat({ userId: data.id, chatId: chatId }));
  };

  const getProfile = async () => {
    if (params.user) {
      await dispatch(fetchGetProfile({ userName: params.user }));
      await dispatch(fetchChatsUser({ userName: params.user }));
    } else if (statusAuth === "completed") {
      await dispatch(fetchGetProfile({ userName: data.userName }));
      await dispatch(fetchChatsUser({ userName: data.userName }));
    }
  };

  const searchChatAsync = async (chatName: string) => {
    await dispatch(fetchSearchChat({ chatName }));
  };

  const onChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    set: React.Dispatch<React.SetStateAction<string>>
  ) => {
    set(event.target.value);
  };

  const onClickClear = (
    inputRef: React.RefObject<HTMLInputElement>,
    setProps: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setProps("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    getProfile();
  }, [statusEnterChat, statusLeaveChat, whoseProfile, statusAuth]);

  useEffect(() => {
    if (search) {
      searchChatAsync(search);
    }
  }, [search]);

  if (
    params.user &&
    statusAuth === "completed" &&
    params.user === data.userName
  )
    return <Navigate to="/profile" />;

  if (profileStatus === "error")
    return <Navigate to={location.state?.from?.pathname || "/oops"} />;

  if (!isAuth && statusAuth === "error") return <Navigate to={fromPage} />;

  return (
    <>
      {profileStatus === "loading" && <Loader />}
      <div className={cl.container}>
        <div className={cl.profile}>
          {whoseProfile && (
            <Link
              to="/profile"
              className={`${cl.profile__button} ${cl.profile__profile}`}
            >
              Profile
            </Link>
          )}
          <div onClick={onClickCreateChat} className={cl.profile__button}>
            Create chat
          </div>
          <div
            onClick={onClickLogout}
            className={`${cl.profile__button} ${cl.profile__exit}`}
          >
            Go out
          </div>
          {profileStatus === "completed" && data && (
            <div className={cl.profile__block}>
              <img
                src={`https://localhost:7275/${profile.pathPhoto}`}
                alt="Avatar"
                className={cl.profile__block__photo}
              />
              <div className={cl.profile__block__info}>
                <div className={cl.profile__block__info__text}>Login:</div>
                <div className={cl.profile__block__info__text}>
                  {profile.userName}
                </div>
              </div>
              <div className={cl.profile__block__info}>
                <div className={cl.profile__block__info__text}>E-mail:</div>
                <div className={cl.profile__block__info__text}>
                  {profile.email}
                </div>
              </div>
              <div className={cl.profile__block__info}>
                <div className={cl.profile__block__info__text}>
                  Date register:
                </div>
                <div className={cl.profile__block__info__text}>
                  {profile.dateReg}
                </div>
              </div>
              <div className={cl.profile__block__info}>
                <div className={cl.profile__block__info__text}>Role:</div>
                <div className={cl.profile__block__info__text}>
                  {profile.roles.map((r) => r.toLowerCase())}
                </div>
              </div>
              <Link to="/" className={cl.profile__block__main}>
                Main
              </Link>
            </div>
          )}
          <div className={cl.search}>
            <div className={cl.search__block}>
              <div className={cl.search__block__title}>
                {params.user ? profile.userName + " chats" : "My chats"}
              </div>
              {!whoseProfile && (
                <div>
                  <input
                    value={search}
                    ref={searchRef}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onChangeInput(e, setSearch)
                    }
                    placeholder="Search..."
                    className={cl.search__block__input}
                  />
                  {search && (
                    <span
                      title="Clear"
                      onClick={() => onClickClear(searchRef, setSearch)}
                      className={cl.search__block__input__clear}
                    >
                      ⛌
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className={cl.search}>
              {search ? (
                <>
                  {statusSearchChat === "completed" &&
                    searchChat.map((c) => (
                      <div key={c.id} className={cl.search__items}>
                        <Link
                          to={`/${c.id}`}
                          className={cl.search__items__item}
                        >
                          <img
                            src={photo}
                            alt="Avatar"
                            className={cl.search__items__item__photo}
                          />
                          <div className={cl.search__items__item__text}>
                            {c.nameChat}
                          </div>
                          <div className={cl.search__items__item__text}>
                            {c.dateCreat}
                          </div>
                        </Link>
                        {!userChats.find((s) => s.id === c.id) && (
                          <button
                            onClick={() => onClickJoinChat(c.id)}
                            className={cl.search__items__button}
                            title="Enter the chat"
                          >
                            Join
                          </button>
                        )}
                      </div>
                    ))}
                </>
              ) : (
                <>
                  {statusUserChats === "completed" &&
                    userChats.map((c) => (
                      <div key={c.id} className={cl.search__items}>
                        <Link
                          key={c.id}
                          to={`/${c.id}`}
                          className={cl.search__items__item}
                        >
                          <img
                            src={photo}
                            alt="Avatar"
                            className={cl.search__items__item__photo}
                          />
                          <div className={cl.search__items__item__text}>
                            {c.nameChat}
                          </div>
                          <div className={cl.search__items__item__text}>
                            {c.dateCreat}
                          </div>
                        </Link>
                        <button
                          onClick={() => onClickLeaveChat(c.id)}
                          className={cl.search__items__button}
                          title="Leave the chat"
                        >
                          Leave
                        </button>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
