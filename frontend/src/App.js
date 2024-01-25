import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import PrivateRouter from "./utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import Dashboard from "./views/Dashboard";
import NavBar from "./views/NavBar";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route exact path="/dashboard" element={<PrivateRouter />}>
            {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
            {/* <PrivateRouter component={Dashboard} path={"/dashoard"} /> */}
          </Route>

          <Route element={<LoginPage />} path="/login" />
          <Route element={<RegisterPage />} path="/register" />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
