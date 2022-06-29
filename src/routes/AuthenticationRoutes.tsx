import { Main } from "pages/Main/Main";
import { Login } from "pages/Login/Login";
import { Register } from "pages/Register/Register";
import { Routes, Route, Navigate } from "react-router-dom";

export const AuthenticationRoutes = () => (
  <Routes>
    <Route path="/" element={<Main />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />}></Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
