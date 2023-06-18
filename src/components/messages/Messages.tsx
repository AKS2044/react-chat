import { useEffect, useRef } from "react";
import cl from "./Messages.module.scss";
import reactStringReplace from "react-string-replace";
import { fetchDeleteMessage } from "../../redux/Chat/asyncActions";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectLoginData } from "../../redux/Auth/selectors";
import { MessageParams } from "../../redux/Chat/types";
import { Link } from "react-router-dom";

const Messages: React.FC<MessageParams[]> = (messages) => {
  const dispatch = useAppDispatch();
  const messageRef = useRef<HTMLDivElement>(null);
  const { data } = useSelector(selectLoginData);

  const OnClickDeleteMessage = (messageId: number) => {
    dispatch(fetchDeleteMessage({ messageId }));
  };

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { clientHeight } = messageRef.current;
      window.scrollTo(0, clientHeight);
    }
  }, [messages]);
  return (
    <div ref={messageRef}>
      {Object.values(messages).map((m, i) => (
        <div
          key={i}
          className={
            m.userName === data.userName
              ? `${cl.block} ${cl.block__your}`
              : `${cl.block}`
          }
        >
          <div
            className={
              m.userName === data.userName
                ? `${cl.block__message} ${cl.message__your}`
                : `${cl.block__message}`
            }
          >
            <Link to={`/profile/${m.userName}`}>
              <div className={cl.block__message__name}>{m.userName}</div>
            </Link>
            <div className={cl.block__message__text}>
              {reactStringReplace(m.message, /:(.+?):/g, (match, i) => (
                <img
                  key={i}
                  className={cl.emoji}
                  alt="smile"
                  src={`/assets/smiles/${match}.png`}
                />
              ))}
            </div>
            <div className={cl.block__message__date}>{m.dateWrite}</div>
            {(m.userName === data.userName ||
              data.roles.find((r) => r === "ADMIN")) && (
              <span
                className={cl.block__message__delete}
                onClick={() => OnClickDeleteMessage(m.id)}
              >
                ⛌
              </span>
            )}
          </div>
          <Link to={`/profile/${m.userName}`}>
            <img
              src={`https://localhost:7275/${m.pathPhoto}`}
              alt="User"
              className={cl.block__photo}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Messages;
