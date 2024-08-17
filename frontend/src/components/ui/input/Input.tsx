import React, { MouseEventHandler } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InPlaceError from "components/in-place-error/InPlaceError";
import "./input.scss";

export const Label = ({ label }: { label: string }) => {
  return (
    <div className="input-label__wrapper">
      <label htmlFor="label" className="input-label">
        {label}
      </label>
    </div>
  );
};

export const InputSubText = ({ SubText }: { SubText: string }) => {
  return <label className="input__subtext">{SubText}</label>;
};

const Icon = ({
  icon,
  isIconPointer,
  onIconClick,
}: {
  icon: IconDefinition;
  isIconPointer?: boolean;
  onIconClick?: MouseEventHandler<HTMLSpanElement>;
}) => {
  return (
    <span
      className={`input--icon ${isIconPointer ? "input--icon--pointer" : ""}`}
      onClick={onIconClick}
    >
      <FontAwesomeIcon icon={icon} />
    </span>
  );
};

export interface InputProps {
  icon?: IconDefinition;
  label?: string;
  subText?: string;
  placeholder: string;
  errorMessage?: string;
  type?: string;
  maxLength?: number;
  onIconClick?: MouseEventHandler<HTMLSpanElement>;
  isIconPointer?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon,
      label,
      subText,
      placeholder,
      errorMessage,
      type = "text",
      maxLength,
      onIconClick,
      isIconPointer = false,
      isReadOnly = false,
      isDisabled = false,
      name,
      onChange,
      onBlur,
    }: InputProps,
    ref
  ) => {
    return (
      <div className="input-container">
        {label && <Label label={label} />}
        <div className="input__wrapper">
          <input
            name={name}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            className={errorMessage ? "input input--error" : "input"}
            disabled={isDisabled}
            type={type}
            placeholder={placeholder}
            maxLength={maxLength}
            readOnly={isReadOnly}
          />
          {icon && (
            <Icon
              icon={icon}
              isIconPointer={isIconPointer}
              onIconClick={onIconClick}
            />
          )}
          {errorMessage && <InPlaceError errorPhrase={errorMessage} />}
          {subText && <InputSubText SubText={subText} />}
        </div>
      </div>
    );
  }
);
