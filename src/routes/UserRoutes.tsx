import { Home } from "pages/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";

export const UserRoutes = () => (
  <>
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/home/:id" element={<Home />}></Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  </>
);
