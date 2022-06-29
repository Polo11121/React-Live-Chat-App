import { useState } from "react";
import { ChatCard } from "components/ChatCard/ChatCard";
import { ChatModal } from "components/ChatModal/ChatModal";
import { Header } from "components/Header/Header";
import { ChatTypes } from "types/types";
import { inputHandler } from "helpers/functions";
import { CircularProgress } from "@mui/material";
import classNames from "classnames";
import "./Navbar.scss";

export const Navbar = ({ chats }: { chats: ChatTypes | null }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const changeChatModalStateHandler = () =>
    setIsChatModalOpen((prevState) => !prevState);

  const changeSearchValueHandler = inputHandler(setSearchValue);

  return (
    <div className="navbar">
      <Header />
      <div className="navbar__content">
        <div style={{ padding: "15px 0" }}>
          <button
            className="navbar__button"
            onClick={changeChatModalStateHandler}
          >
            Add chat
          </button>
        </div>
        <input
          onChange={changeSearchValueHandler}
          value={searchValue}
          className="navbar__input"
          type="text"
          placeholder="Search or start new chat..."
        />
        <div
          className={classNames("navbar__chats-list", {
            "navbar__chats-list--empty": !chats,
          })}
        >
          {chats ? (
            chats
              .filter(({ chatName }) =>
                chatName.toUpperCase().includes(searchValue.toUpperCase())
              )
              .sort((chat1, chat2) =>
                chat1.chatName.localeCompare(chat2.chatName)
              )
              .map(({ chatName, chatAvatarURL, id, messages }) => {
                const message = messages[messages.length - 1];

                return (
                  <ChatCard
                    key={id}
                    chatId={id}
                    chatAvatarPhoto={chatAvatarURL}
                    chatName={chatName}
                    lastUser={message?.user?.displayName}
                    lastMessage={message?.message}
                  />
                );
              })
          ) : (
            <CircularProgress
              style={{ display: "flex", alignItems: "center" }}
              color="secondary"
            />
          )}
        </div>
      </div>
      {isChatModalOpen && (
        <ChatModal
          isModalOpen={isChatModalOpen}
          onModalClose={changeChatModalStateHandler}
        />
      )}
    </div>
  );
};
