import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";

import "./nav-bar.scss";
import Logout from "../logout/Logout";
import localDB from "utilities/localDB";
import { useRedirect } from "hooks/useRedirect";

export interface INavBarProps {
  userName?: string;
  showNavLinks?: boolean;
}

export default function NavBar({
  userName,
  showNavLinks = false,
}: Readonly<INavBarProps>) {
  const navRef = useRef<HTMLElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useRedirect(isSuccess, "/");

  const showNavbar = () => {
    navRef.current?.classList.toggle("navbar--actions");
  };

  const handleLogout = () => {
    localDB.logout();
    setIsSuccess(true);
  };

  return (
    <>
      <nav ref={navRef} className="navbar">
        {showNavLinks ? <NavLinks /> : <NavLinks className="hidden" />}
        {userName && <span className="navbar__username">{userName}</span>}
        {userName && (
          <Logout name="Save & Logout" onClickLogout={handleLogout} />
        )}
        <span onClick={showNavbar} className="navbar__btn navbar__close-btn">
          <FontAwesomeIcon icon={faXmark} />
        </span>
      </nav>
      <span onClick={showNavbar} className="navbar__btn">
        <FontAwesomeIcon icon={faBars} />
      </span>
    </>
  );
}

function NavLinks({ className = "" }: Readonly<{ className?: string }>) {
  const navbarClass = "navbar__links" + " " + className;
  return (
    <div className={navbarClass}>
      <NavLink to="/dashboard" className="link" end>
        Dashboard
      </NavLink>
    </div>
  );
}
