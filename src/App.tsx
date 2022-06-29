import { useAuth } from "contexts/AuthContext";
import { AuthenticationRoutes } from "routes/AuthenticationRoutes";
import { UserRoutes } from "routes/UserRoutes";
import "./App.scss";

const App = () => {
  const { currentUser } = useAuth();

  return currentUser?.displayName ? <UserRoutes /> : <AuthenticationRoutes />;
};

export default App;
