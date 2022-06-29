import { Link } from "react-router-dom";
import { useLogin } from "pages/Login/useLogin";
import logo from "assets/logo.png";
import classNames from "classnames";
import "./Login.scss";

export const Login = () => {
  const {
    email,
    password,
    isLoading,
    changeEmailHandler,
    changePasswordHandler,
    loginHandler,
  } = useLogin();

  return (
    <div className="login">
      <div className="login__content">
        <img className="login__logo" src={logo} alt="live-chat-logo" />
        <input
          value={email}
          onChange={changeEmailHandler}
          placeholder="Type email..."
          className="login__input"
          type="text"
        />
        <input
          value={password}
          onChange={changePasswordHandler}
          placeholder="Type password..."
          className="login__input"
          type="password"
        />
        <button
          disabled={isLoading}
          onClick={loginHandler}
          className={classNames("login__button", {
            "login__button--disabled": isLoading,
          })}
        >
          Login
        </button>
        <span>Don't have an account yet?</span>
        <Link className="login__link" to="/register">
          Register Now!
        </Link>
      </div>
    </div>
  );
};
