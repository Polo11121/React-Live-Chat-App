import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "firebase-config";
import { useAuth } from "contexts/AuthContext";
import { ChatType } from "types/types";
import { formatChatMember } from "helpers/formatters";
import { MessagesList } from "components/MessagesList/MessagesList";
import { inputHandler } from "helpers/functions";
import { useSwitchTo } from "helpers/useSwitchTo";
import sendIcon from "assets/send.png";
import backIcon from "assets/back.png";
import classNames from "classnames";
import "./Chat.scss";

export const Chat = ({ chat }: { chat?: ChatType | null }) => {
  const [inputValue, setInputValue] = useState("");
  const { currentUser } = useAuth();
  const { id } = useParams();

  const switchToChatList = useSwitchTo("/home");

  const changeInputValueHandler = inputHandler(setInputValue);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputValue("");
    await updateDoc(doc(db, "chats", `${id}`), {
      messages: arrayUnion({
        message: inputValue,
        user: formatChatMember(currentUser),
        timestamp: new Date().toLocaleString(),
      }),
    });
  };

  return (
    <div className="chat">
      <div className="chat__header">
        {id && chat && (
          <>
            <img
              onClick={switchToChatList}
              src={backIcon}
              className="chat__header-back"
              alt="back-icon"
            />
            <div className="chat__header-info">
              <img
                className="chat__header-avatar"
                src={chat.chatAvatarURL}
                alt=""
              />
              <div className="chat__header-right">
                <span className="chat__header-title">{chat?.chatName}</span>
                <span className="chat__header-last-message">
                  Last message:{" "}
                  {chat?.messages[chat?.messages.length - 1]?.timestamp}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="chat__content">
        {chat?.messages && <MessagesList messages={chat?.messages} />}
      </div>

      <form onSubmit={sendMessage} className="chat__input-container">
        <input
          onChange={changeInputValueHandler}
          value={inputValue}
          disabled={!id || !chat}
          className="chat__input"
          type="text"
          placeholder="Type a message...."
        />

        <button
          type="submit"
          className="chat__input-button"
          disabled={!id || !inputValue}
        >
          <img
            className={classNames("chat__input-icon", {
              "chat__input-icon--disabled": !id || !inputValue,
            })}
            src={sendIcon}
            alt="send-icon"
          />
        </button>
      </form>
    </div>
  );
};
