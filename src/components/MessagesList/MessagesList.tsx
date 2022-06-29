import { Message } from "components/Message/Message";
import { useAuth } from "contexts/AuthContext";
import { MessagesType } from "types/types";
import ScrollToBottom from "react-scroll-to-bottom";
import "./MessagesList.scss";

export const MessagesList = ({ messages }: { messages: MessagesType }) => {
  const { currentUser } = useAuth();

  return (
    <ScrollToBottom
      className="messages-list"
      scrollViewClassName="messages-list__content"
    >
      {messages.map(({ message, timestamp, user }, index) => (
        <Message
          key={index}
          message={message}
          timestamp={timestamp}
          user={user}
          isOwner={currentUser?.uid === user?.id}
        />
      ))}
    </ScrollToBottom>
  );
};
