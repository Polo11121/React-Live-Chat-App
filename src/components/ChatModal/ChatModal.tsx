import { useChatModal } from "components/ChatModal/useChatModal";
import { groupImageUrl } from "constants/imageUrls";
import Modal from "components/Modal/Modal";
import Select from "react-select";
import "./ChatModal.scss";

export const ChatModal = ({
  isModalOpen,
  onModalClose,
}: {
  isModalOpen: boolean;
  onModalClose: () => void;
}) => {
  const {
    chatName,
    chatAvatarURL,
    createChat,
    changeChatAvatarURL,
    changeChatNameHandler,
    changeMembers,
    users,
    isDisabled,
  } = useChatModal();

  const createChatHandler = () => {
    createChat();
    onModalClose();
  };

  return (
    <Modal
      isDisabled={isDisabled}
      submitButtonText="Create"
      onSubmit={createChatHandler}
      isModalOpen={isModalOpen}
      onModalClose={onModalClose}
      title="Create New Chat"
    >
      <div className="chat-modal">
        <img
          className="chat-modal__avatar"
          src={chatAvatarURL || groupImageUrl}
          alt="chat-avatar"
        />
        <input
          value={chatAvatarURL}
          onChange={changeChatAvatarURL}
          placeholder="Paste chat avatar URL..."
          style={{ width: "100%" }}
          className="chat-modal__input"
          type="text"
        />
        <input
          value={chatName}
          onChange={changeChatNameHandler}
          placeholder="Type chat name..."
          style={{ width: "100%" }}
          className="chat-modal__input"
          type="text"
        />
        <Select
          onChange={changeMembers}
          className="chat-modal__select"
          styles={{
            valueContainer: (provided) => ({
              ...provided,
              width: "200px",
              maxHeight: "45px",
              overflow: "auto",
            }),
          }}
          placeholder="Add user to chat"
          closeMenuOnSelect={false}
          isMulti
          options={users.map((user) => ({
            label: user,
            value: user,
          }))}
          formatOptionLabel={({ value }) => (
            <div className="chat-modal__option">
              <img
                className="chat-modal__option-avatar"
                src={value.photoURL}
                alt="avatar"
              />
              <span>{value.displayName}</span>
            </div>
          )}
        />
      </div>
    </Modal>
  );
};
