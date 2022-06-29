import logo from "assets/logo.png";
import { useSwitchTo } from "helpers/useSwitchTo";
import "./Main.scss";

export const Main = () => {
  const switchToLoginPage = useSwitchTo("/login");

  const switchToRegisterPage = useSwitchTo("/register");

  return (
    <div className="main">
      <div className="main__content">
        <img className="main__logo" src={logo} alt="live-chat-logo" />
        <div className="main__buttons">
          <button
            onClick={switchToLoginPage}
            className="main__button main__button--primary"
          >
            Login
          </button>
          <button
            onClick={switchToRegisterPage}
            className="main__button main__button--secondary"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
