import { useState, useEffect } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PasswordChecklist from "react-password-checklist";

import { ReactComponent as CheckImg } from "assets/images/check.svg";
import { ReactComponent as CircleImg } from "assets/images/circle.svg";
import { Input } from "components/ui/input/Input";
import * as Constant from "utilities/Constant";
import "./password_checker.scss";

export const passwordIcon = (isPasswordVisible: boolean) =>
  isPasswordVisible ? faEye : faEyeSlash;
export const passwordType = (isPasswordVisible: boolean) =>
  isPasswordVisible ? "text" : "password";

interface PasswordAndConfirmPasswordProps {
  checkErrors?: boolean;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const PasswordAndConfirmPassword = ({
  checkErrors = true,
  onChange,
}: PasswordAndConfirmPasswordProps) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordAgainVisible, setPasswordAgainVisible] = useState(false);
  const [passwordCheckerError, setPasswordCheckerError] = useState("");
  const [passwordsDoNotMatchError, setPasswordsDoNotMatchError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (checkErrors) {
      setPasswordsDoNotMatchError(
        password !== passwordAgain ? Constant.PWD_MATCH_ERROR : ""
      );
    }
  }, [checkErrors, password, passwordAgain]);

  const passwordChecklistStyle = isValid
    ? " password-checker--validFalse"
    : " password-checker--validTrue";

  return (
    <>
      <Input
        name="password_input"
        type={passwordType(isPasswordVisible)}
        placeholder="Password"
        icon={passwordIcon(isPasswordVisible)}
        label="Create Password"
        onIconClick={() => setPasswordVisible(!isPasswordVisible)}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setPassword(e.currentTarget.value)
        }
        isIconPointer
        errorMessage={(checkErrors && passwordCheckerError) || ""}
      />
      <div
        className={
          "input__wrapper no-margin-top password-checker" +
          passwordChecklistStyle
        }
      >
        Passwords must:
        <PasswordChecklist
          rules={["capital", "lowercase", "number", "specialChar", "minLength"]}
          minLength={Constant.PWD_MIN_LENGTH}
          value={password}
          valueAgain={passwordAgain}
          messages={{
            minLength: Constant.PWD_CHECK_MIN_LENGTH,
            capital: Constant.PWD_CHECK_UPPER_CASE,
            lowercase: Constant.PWD_CHECK_LOWER_CASE,
            number: Constant.PWD_CHECK_NUMBER,
            specialChar: Constant.PWD_CHECK_SPECIAL_CHAR,
          }}
          onChange={(isValid) => {
            setIsValid(isValid);
            setPasswordCheckerError(
              isValid ? "" : Constant.INVALID_PASSWORD_ERROR
            );
          }}
          iconComponents={{
            ValidIcon: <CheckImg className="validCheck margin-small" />,
            InvalidIcon: <CircleImg className="invalidCircle margin-small" />,
          }}
        />
      </div>
      <Input
        name="confirm_password"
        type={passwordType(isPasswordAgainVisible)}
        placeholder="Confirm Password"
        label="Confirm Password"
        icon={passwordIcon(isPasswordAgainVisible)}
        onIconClick={() => setPasswordAgainVisible(!isPasswordAgainVisible)}
        isIconPointer
        errorMessage={(checkErrors && passwordsDoNotMatchError) || ""}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setPasswordAgain(e.currentTarget.value);
          if (onChange) {
            onChange(e);
          }
        }}
      />
    </>
  );
};

export default PasswordAndConfirmPassword;
