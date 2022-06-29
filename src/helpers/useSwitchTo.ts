import { useNavigate } from "react-router-dom";

export const useSwitchTo = (location: string) => {
  const navigate = useNavigate();

  return () => navigate(location);
};
