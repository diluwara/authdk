import { useRoutes, useLocation } from "react-router-dom";
import ForgotPassword from "pages/forgot-password/ForgotPassword";
import Login from "pages/login/Login";
import Registration from "pages/registration/Registration";
import ResetPassword from "pages/reset-password/ResetPassword";
import Header from "components/ui/header/Header";
import Dashboard from "pages/dashboard/Dashboard";
import localDB from "utilities/localDB";

export type Route =
  | "/"
  | "/registration"
  | "/forgotpassword"
  | "/resetpassword"
  | "/dashboard";

export function Routes() {
  const user = localDB.get();
  const showNavLinks = useLocation().pathname.includes("/dashboard");
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <Header
          // logo={nafhubImg}
          userName={user?.name}
          showNavLinks={showNavLinks}
        />
      ),
      children: [
        { index: true, element: <Login /> },
        { path: "registration", element: <Registration /> },
        { path: "forgotpassword", element: <ForgotPassword /> },
        { path: "resetpassword", element: <ResetPassword /> },
        { path: "dashboard", element: <Dashboard /> },
      ],
    },
  ]);
  return routes;
}
