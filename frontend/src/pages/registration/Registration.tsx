import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Consent } from "components/consent/Consent";
import PasswordAndConfirmPassword from "components/password-and-confirm-password/PasswordAndConfirmPassword";
import { Button } from "components/ui/button/Button";
import Form from "components/ui/form/Form";
import { FormInput } from "components/ui/form/FormInput";
import {
  RegisterData,
  usePostRegistrationMutation,
} from "../../services/registrationService";
import * as Constant from "utilities/Constant";
import { email, name, password_input } from "utilities/formSchemas";
import "./registration.scss";
import { useToast } from "components/ui/react-toast/ReactToast";
import { decryptObject } from "utilities/cryptoUtils";
import localDB from "utilities/localDB";
import { useRedirect } from "hooks/useRedirect";

interface RegistrationResponse {
  success: boolean;
  message: string;
  data: string; // Encrypted data should be a string
}

interface DecryptedData {
  id: string;
  email: string;
  name: string;
}

// Define the form schema
const formSchema = z.object({
  email,
  name,
  password_input: password_input, // Ensure this matches your schema
});

type FormValues = z.infer<typeof formSchema>;

export default function Registration() {
  const { notifySuccess, notifyError } = useToast();
  const [isDisable, setIsDisable] = useState(false);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const [PostRegistration] = usePostRegistrationMutation();
  const userState = localDB.get();

  useRedirect(userState?.isAuthenticated ?? false, "/dashboard");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Using any for now, we will type this properly
    try {
      setIsDisable(true);
      const registrationData: RegisterData = {
        email: data.email,
        name: data.name,
        password: data.password_input,
        type: "user", // Default type value
      };

      const response = (await PostRegistration(
        registrationData
      ).unwrap()) as RegistrationResponse;
      if (response.success) {
        notifySuccess(response.message);
        const decryptedData: DecryptedData | null = decryptObject(
          response.data
        );
        if (decryptedData) {
          setIsDisable(false);
          const { id = "", email = "", name = "" } = decryptedData;

          localDB.login(id, email, name);
        }
      } else {
        setIsDisable(false);
        notifyError(response.message);
      }
    } catch (error) {
      setIsDisable(false);
      console.error("Registration failed, error:", error);
    }
  };

  return (
    <>
      <div className="container registration">
        <div className="header__wrapper">
          <h1>Welcome!</h1>
          <span className="sub-header sub-header--primary">
            Let's get your application started
          </span>
          <span className="inner-header">
            Please complete the information below to create your New Account
          </span>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="row--item">
              <FormInput
                formHandle={register("name")}
                inputProps={{
                  name: "name",
                  placeholder: "Enter Your Name",
                  label: "Name",
                  errorMessage: errors.name?.message as string,
                }}
              />
            </div>
            <div className="row--item">
              <FormInput
                formHandle={register("email")}
                inputProps={{
                  name: "email",
                  placeholder: "Enter Your Email",
                  label: "Email",
                  errorMessage: errors.email?.message as string,
                }}
              />
            </div>
          </div>
          {/* Passing isSubmitted from formState to check errors on submit */}
          <Controller
            name="password_input"
            control={control}
            render={({ field: { onChange } }) => (
              <PasswordAndConfirmPassword
                onChange={onChange}
                checkErrors={isSubmitted}
              />
            )}
          />
          <Button title="Sign Up" disabled={isDisable} />
        </Form>
      </div>
      <Consent
        partnersLink={Constant.PARTNERSLINK}
        termsOfUseLink={Constant.TERMSOFUSELINK}
        privacyLink={Constant.PRIVACYLINK}
      />
    </>
  );
}
