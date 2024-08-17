import { useState } from "react";

import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./privacy-policy.scss";

export interface PrivacyPolicyProps {
  privacyLink: string;
}

export const PrivacyPolicy = ({ privacyLink }: PrivacyPolicyProps) => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(true);

  return (
    <>
      {showPrivacyPolicy ? (
        <div className="consent__reader--wrapper">
          <p>
            By using our site, you agree to our use of cookies. For more
            information, read our{" "}
            <a
              href={privacyLink}
              target="_blank"
              rel="noreferrer"
              className="privacy-link"
            >
              Privacy Policy.
            </a>
          </p>
          <span
            className="close-banner"
            onClick={() => {
              setShowPrivacyPolicy(false);
            }}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </span>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
