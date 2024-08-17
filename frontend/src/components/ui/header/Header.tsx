import "./header.scss";

import NavBar, { INavBarProps } from "components/ui/nav-bar/NavBar";
import { Outlet } from "react-router-dom";

interface IHeaderProps extends INavBarProps {
  logo?: string;
}

function Header({ logo, userName, showNavLinks }: IHeaderProps) {
  return (
    <>
      <header className="nafhub-header">
        <img className="nafhub-logo" src={logo} alt="logo" />
        {userName && <NavBar userName={userName} showNavLinks={showNavLinks}/>}
      </header>
      <Outlet />
    </>
  );
}

export default Header;
