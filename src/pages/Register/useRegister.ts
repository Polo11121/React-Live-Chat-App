import { ChangeEvent, useState } from "react";
import { useAuth } from "contexts/AuthContext";

export const useRegister = () => {
  const { signUp, isLoading } = useAuth();
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const { email, displayName, password } = inputValues;

  const changeEmailHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValues((prevValues) => ({
      ...prevValues,
      email: event.target.value,
    }));

  const changeDisplayNameHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValues((prevValues) => ({
      ...prevValues,
      displayName: event.target.value,
    }));

  const changePasswordHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValues((prevValues) => ({
      ...prevValues,
      password: event.target.value,
    }));

  const registerHandler = () => signUp(email, displayName, password);

  return {
    email,
    displayName,
    password,
    isLoading,
    changeEmailHandler,
    changeDisplayNameHandler,
    changePasswordHandler,
    registerHandler,
  };
};
