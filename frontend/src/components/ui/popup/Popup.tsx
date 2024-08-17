import { Button } from "../button/Button";
import "./popup.scss";

export interface PopupProps {
  onClickContinue?: () => void;
  onClickLogout?: () => void;
  onShow?: boolean;
}

const Popup = ({ onClickContinue, onClickLogout, onShow }: PopupProps) => {
  return (
    <div className={`popup ${onShow ? "popup--show" : "popup--hide"}`}>
      <div className="popup__content">
        <p>Hello! </p>
        <p>
          Your progress is automatically saved. Press continue to return to
          application or logout. You will not lose any information by logging
          out.
        </p>
      </div>
      <div className="popup__footer">
        <Button
          title="Continue"
          type="default-left"
          variant="secondary-three"
          onClick={onClickContinue}
        />
        <Button title="Logout" type="default-right" onClick={onClickLogout} />
      </div>
    </div>
  );
};

export default Popup;
