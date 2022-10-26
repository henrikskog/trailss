import { Route, Routes } from "react-router-dom";
import "./App.css";

import Landing from "./components/landing/Landing";
import Map from "./components/shared/map/Map";
import Login from "./components/user/auth/login/Login";
import Register from "./components/user/auth/register/Register";

function AppRouter() {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/map" element={<Map />} />
        <Route path="/user/settings" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </div>
  );
}

export default AppRouter;
