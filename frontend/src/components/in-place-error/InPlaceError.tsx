import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface IInPlaceErrorProps {
  errorPhrase?: string;
}

export default function InPlaceError({ errorPhrase }: Readonly<IInPlaceErrorProps>) {
  return (
    <div className="error-message">
      <span className="error-message__icon">
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </span>
      <span>{errorPhrase}</span>
    </div>
  );
}
