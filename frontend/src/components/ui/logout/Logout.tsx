import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import Popup from "../popup/Popup";
import { useState } from "react";
import "./logout.scss";

interface LogoutProps {
  name: string;
  onClickContinue?: () => void;
  onClickLogout?: () => void;
}

export default function Logout({
  name,
  onClickContinue,
  onClickLogout,
}: LogoutProps) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleLogout = () => {
    if (onClickLogout) {
      onClickLogout();
    }
  };

  return (
    <>
      <div className="logout" onClick={handleChange}>
        <span className="logout__description">{name}</span>
        <span className="logout__icon">
          <FontAwesomeIcon icon={faPowerOff} />
        </span>
      </div>
      <Popup
        onShow={checked}
        onClickContinue={onClickContinue}
        onClickLogout={handleLogout}
      />
    </>
  );
}
