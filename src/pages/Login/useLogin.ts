import { ChangeEvent, useState } from "react";
import { useAuth } from "contexts/AuthContext";

export const useLogin = () => {
  const { signIn, isLoading } = useAuth();
  const [inputValues, setInputValues] = useState({ email: "", password: "" });
  const { email, password } = inputValues;

  const changeEmailHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValues((prevValues) => ({
      ...prevValues,
      email: event.target.value,
    }));

  const changePasswordHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValues((prevValues) => ({
      ...prevValues,
      password: event.target.value,
    }));

  const loginHandler = () => signIn(email, password);

  return {
    email,
    password,
    isLoading,
    changeEmailHandler,
    changePasswordHandler,
    loginHandler,
  };
};
