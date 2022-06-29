import { truncate } from "helpers/functions";
import { useSwitchTo } from "helpers/useSwitchTo";
import "./ChatCard.scss";

type ChatCardPropsType = {
  chatAvatarPhoto: string;
  chatName: string;
  chatId: string;
  lastMessage?: string;
  lastUser?: string;
};

export const ChatCard = ({
  chatAvatarPhoto,
  chatName,
  chatId,
  lastMessage,
  lastUser,
}: ChatCardPropsType) => {
  const switchToChat = useSwitchTo(`/home/${chatId}`);

  return (
    <div onClick={switchToChat} className="chat-card">
      <img className="chat-card__avatar" src={chatAvatarPhoto} alt="" />
      <div className="chat-card__info">
        <span className="chat-card__title">{chatName}</span>
        {lastUser ? (
          <span className="chat-card__last-message">
            <span style={{ fontWeight: "700" }}>{lastUser}: </span>
            {truncate(20, lastMessage)}
          </span>
        ) : (
          <span
            style={{ fontWeight: "700" }}
            className="chat-card__last-message"
          >
            Chat created!
          </span>
        )}
      </div>
    </div>
  );
};
