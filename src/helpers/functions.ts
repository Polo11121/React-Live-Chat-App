import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const truncate = (inputLength: number, input?: string) =>
  input && input?.length > inputLength
    ? `${input?.substring(0, inputLength)}...`
    : input;

export const inputHandler =
  (setInputValue: Dispatch<SetStateAction<string>>) =>
  (event: ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);
