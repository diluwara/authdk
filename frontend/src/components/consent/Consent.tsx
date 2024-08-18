import { PrivacyPolicy } from "components/privacy-policy/PrivacyPolicy";
import "./consent.scss";

export interface ConsentProps {
  partnersLink: string;
  termsOfUseLink: string;
  privacyLink: string;
}

export const Consent = ({
  partnersLink,
  termsOfUseLink,
  privacyLink,
}: ConsentProps) => {
  return (
    <>
      <div className="consent">
        <div className="consent__wrapper">
          <p className="consent--item">
            By clicking “Sign Up”, I acknowledge that I have reviewed the
            Privacy Policy{" "}(
            <a href={privacyLink} target="_blank" rel="noreferrer">
              link
            </a>){" "}and agree by electronic signature to the following: 1) I am
            providing written instructions under the Fair Credit Reporting Act
            authorizing DK to obtain information from my personal credit
            profile or other information from a consumer reporting agency solely to conduct
            a pre-qualification for credit.2) Be contacted by DK
            and its partners (link to{" "}
            <a href={partnersLink} target="_blank" rel="noreferrer">
              {partnersLink}
            </a>){" "}
            4) To the terms of DK’s{" "}
            <a href={termsOfUseLink} target="_blank" rel="noreferrer">
              Terms of Use
            </a>{" "}
            , and{" "}
            <a href={termsOfUseLink} target="_blank" rel="noreferrer">
              Electronic Econsent Agreement
            </a>
            .
          </p>
        </div>
        <div className="consent__reader">
          <div className="consent__reader--wrapper">
            <p>
              If you are using a screen reader or other auxiliary aid and are
              having problems using this website please text{" "}
              <strong>diluwarakhatun56@gmail.com</strong> Ext. 7100 for assistance.
            </p>
          </div>
          <PrivacyPolicy privacyLink={privacyLink} />
        </div>
      </div>
    </>
  );
};
