import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import "./button.scss";

export interface ButtonProps {
  title: string;
  icon?: IconDefinition;
  disabled?: boolean;
  size?: "small" | "medium" | "large" | "full";
  onClick?: () => void;
  className?: string;
  type?: "round" | "squared" | "link" | "default-left" | "default-right";
  variant?:
    | "primary"
    | "outline-primary"
    | "secondary"
    | "secondary-two"
    | "secondary-three"
    | "outline-secondary"
    | "white"
    | "transparent"
    | "success"
    | "warning"
    | "danger";
}

export const Button = ({
  title,
  size,
  className,
  icon,
  type = "round",
  variant = "primary",
  onClick,
  disabled
}: ButtonProps) => {
  const btnClass = classNames(
    {
      btn: true,
      "btn--round": type === "round",
      "btn--squared": type === "squared",
      "btn--default-left": type === "default-left",
      "btn--default-right": type === "default-right",
      "btn--link": type === "link",
      "btn--primary": variant === "primary",
      "btn--outline-primary": variant === "outline-primary",
      "btn--secondary": variant === "secondary",
      "btn--secondary-two": variant === "secondary-two",
      "btn--secondary-three": variant === "secondary-three",
      "btn--outline-secondary": variant === "outline-secondary",
      "btn--white": variant === "white",
      "btn--transparent": variant === "transparent",
      "btn--success": variant === "success",
      "btn--danger": variant === "danger",
      "btn--small": size === "small",
      "btn--medium": size === "medium",
      "btn--large": size === "large",
      "btn--full": size === "full",
    },
    className
  );
  return (
    <button className={btnClass} onClick={onClick} disabled={disabled}>
      {title}

      {icon ? (
        <span>
          <FontAwesomeIcon icon={icon} />
        </span>
      ) : (
        ""
      )}
    </button>
  );
};
