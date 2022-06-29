import { useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { inputHandler } from "helpers/functions";
import Modal from "components/Modal/Modal";
import "./AvatarModal.scss";

export const AvatarModal = ({
  isModalOpen,
  onModalClose,
}: {
  isModalOpen: boolean;
  onModalClose: () => void;
}) => {
  const { currentUser, updateUserPhoto, isLoading } = useAuth();
  const [avatarURL, setAvatarURL] = useState("");

  const changeAvatarURL = inputHandler(setAvatarURL);

  const changeUserPhotoHandler = () => updateUserPhoto(avatarURL, setAvatarURL);

  return (
    <Modal
      isDisabled={!avatarURL || isLoading}
      submitButtonText="Change"
      onSubmit={changeUserPhotoHandler}
      isModalOpen={isModalOpen}
      onModalClose={onModalClose}
      title="Change Your Avatar"
    >
      <div className="avatar-modal">
        <img
          className="avatar-modal__avatar"
          src={avatarURL || (currentUser?.photoURL as string)}
          alt="avatar-url"
        />
        <input
          value={avatarURL}
          onChange={changeAvatarURL}
          placeholder="Paste photo URL..."
          style={{ width: "100%" }}
          className="avatar-modal__input"
          type="text"
        />
      </div>
    </Modal>
  );
};
