import { useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { avatarUrl } from "constants/imageUrls";
import { AvatarModal } from "components/AvatarModal/AvatarModal";
import logo from "assets/logo2.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Header.scss";

export const Header = () => {
  const { logout, currentUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const changeAvatarModalStateHandler = () => {
    setIsAvatarModalOpen((prevState) => !prevState);
    handleClose();
  };

  return (
    <div className="header">
      <img className="header__logo" src={logo} alt="" />
      <div className="header__user-info" onClick={handleClick}>
        <img
          className="header__avatar"
          src={currentUser?.photoURL || avatarUrl}
          alt="avatar"
        />
        <span>{currentUser?.displayName}</span>
      </div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={changeAvatarModalStateHandler}>Avatar</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
      <AvatarModal
        isModalOpen={isAvatarModalOpen}
        onModalClose={changeAvatarModalStateHandler}
      />
    </div>
  );
};
