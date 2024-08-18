import React, { useState, useEffect } from "react";
import { useRoutes, useLocation, Navigate } from "react-router-dom";
import ForgotPassword from "pages/forgot-password/ForgotPassword";
import Login from "pages/login/Login";
import Registration from "pages/registration/Registration";
import ResetPassword from "pages/reset-password/ResetPassword";
import Header from "components/ui/header/Header";
import Dashboard from "pages/dashboard/Dashboard";

interface UserState {
  id: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
}

export type Route =
  | "/"
  | "/registration"
  | "/forgotpassword"
  | "/resetpassword";

export function Routes() {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const location = useLocation();
  const showNavLinks = location.pathname.includes("/dashboard");

  useEffect(() => {
    const storedValue = localStorage.getItem("userState");
    if (storedValue) {
      try {
        // Parse JSON and cast to UserState type
        const userState = JSON.parse(storedValue) as UserState;
        setUserName(userState.name);
        setIsAuthenticated(userState.isAuthenticated);
      } catch (error) {
        console.error("Failed to parse user state:", error);
      }
    }
  }, []);

  const routes = useRoutes([
    {
      path: "/",
      children: [
        {
          index: true,
          element: isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          ),
        },
        { path: "registration", element: <Registration /> },
        { path: "forgotpassword", element: <ForgotPassword /> },
        { path: "resetpassword", element: <ResetPassword /> },
        {
          path: "dashboard",
          element: isAuthenticated ? (
            <>
              <Header userName={userName} showNavLinks={showNavLinks} />
              <Dashboard />
            </>
          ) : (
            <Navigate to="/" replace />
          ),
        },
      ],
    },
  ]);

  return routes;
}
