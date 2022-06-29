import { UserType } from "types/types";
import classNames from "classnames";
import "./Message.scss";

type MessagePropsType = {
  user: UserType;
  message: string;
  timestamp: string;
  isOwner: boolean;
};

export const Message = ({
  user,
  message,
  timestamp,
  isOwner,
}: MessagePropsType) => (
  <div className={classNames("message", { "message--owner": isOwner })}>
    <div className="message__user">
      <img
        className="message__user-photo"
        src={user.photoURL}
        alt="user-avatar"
      />
      <span>{user.displayName}</span>
    </div>
    <div
      className={classNames("message__content", {
        "message__content--owner": isOwner,
      })}
    >
      <span className="message__text">{message}</span>
      <span className="message__timestamp">{timestamp}</span>
    </div>
  </div>
);
