import { Chat } from "components/Chat/Chat";
import { Navbar } from "components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useGetChats } from "api/useGetChats";
import classNames from "classnames";
import "./Home.scss";

export const Home = () => {
  const { id } = useParams();
  const chats = useGetChats();

  return (
    <div className="home">
      <div
        className={classNames("home__navbar", {
          "home__navbar--hidden": !!id,
        })}
      >
        <Navbar chats={chats} />
      </div>
      <div
        className={classNames("home__header", {
          "home__header--show": !!id,
        })}
      >
        <Chat chat={chats?.find(({ id: chatId }) => chatId === id)} />
      </div>
    </div>
  );
};
