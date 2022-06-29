import { ReactNode } from "react";
import Modal from "@mui/material/Modal";
import classNames from "classnames";
import "./Modal.scss";

type CustomModalPropsType = {
  isModalOpen: boolean;
  onModalClose: () => void;
  children: ReactNode;
  title: string;
  onSubmit: () => void;
  submitButtonText: string;
  isDisabled: boolean;
};

export const CustomModal = ({
  isModalOpen,
  onModalClose,
  children,
  title,
  onSubmit,
  submitButtonText,
  isDisabled,
}: CustomModalPropsType) => (
  <>
    <Modal className="modal" open={isModalOpen} onClose={onModalClose}>
      <div className="modal__content">
        <div className="modal__title">{title}</div>
        {children}
        <div className="modal__buttons ">
          <button
            onClick={onModalClose}
            className="modal__button modal__button--secondary"
          >
            Back
          </button>
          <button
            disabled={isDisabled}
            onClick={onSubmit}
            className={classNames("modal__button modal__button--primary", {
              "modal__button--disabled": isDisabled,
            })}
          >
            {submitButtonText}
          </button>
        </div>
      </div>
    </Modal>
  </>
);

export default CustomModal;
