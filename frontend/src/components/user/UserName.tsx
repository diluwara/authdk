import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./user-name.scss";

interface IUserProps {
  userName: string;
}

export default function UserName({ userName }: IUserProps) {
  return (
    <div className="user">
      <span className="user-name">{userName}</span>
      <span className="logout__icon">
        <FontAwesomeIcon icon={regular("power-off")} />
      </span>
    </div>
  );
}
