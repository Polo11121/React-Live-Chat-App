import { Link } from "react-router-dom";
import { useRegister } from "pages/Register/useRegister";
import logo from "assets/logo.png";
import classNames from "classnames";
import "./Register.scss";

export const Register = () => {
  const {
    email,
    displayName,
    password,
    isLoading,
    changeEmailHandler,
    changeDisplayNameHandler,
    changePasswordHandler,
    registerHandler,
  } = useRegister();

  return (
    <div className="register">
      <div className="register__content">
        <img className="register__logo" src={logo} alt="live-chat-logo" />
        <input
          placeholder="Type email..."
          className="register__input"
          value={email}
          onChange={changeEmailHandler}
          type="text"
        />
        <input
          placeholder="Type username..."
          className="register__input"
          value={displayName}
          onChange={changeDisplayNameHandler}
          type="text"
        />
        <input
          value={password}
          onChange={changePasswordHandler}
          placeholder="Type password..."
          className="register__input"
          type="password"
        />
        <button
          disabled={isLoading}
          className={classNames("register__button", {
            "register__button--disabled": isLoading,
          })}
          onClick={registerHandler}
        >
          Register
        </button>
        <span>Already have an account?</span>
        <Link className="register__link" to="/login">
          Login Now!
        </Link>
      </div>
    </div>
  );
};
