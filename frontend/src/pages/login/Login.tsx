import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  passwordIcon,
  passwordType,
} from "components/password-and-confirm-password/PasswordAndConfirmPassword";
import { PrivacyPolicy } from "components/privacy-policy/PrivacyPolicy";
import { Button } from "components/ui/button/Button";
import Form from "components/ui/form/Form";
import { FormInput } from "components/ui/form/FormInput";
import { usePostLoginMutation } from "services/loginService";
import * as Constant from "utilities/Constant";
import { email, password_input as password } from "utilities/formSchemas";
import "./login.scss";
import { useToast } from "components/ui/react-toast/ReactToast";
import { decryptObject } from "utilities/cryptoUtils";
import { useDispatch } from "react-redux";
import { setUser } from "components/user/userSlice";

// Define types for API response and decrypted data
interface LoginResponse {
  success: boolean;
  message: string;
  data: string; // Encrypted data should be a string
}

interface DecryptedData {
  id: string;
  email: string;
  name: string;
}

const formSchema = z.object({
  email,
  password,
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const { notifySuccess, notifyError } = useToast();
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const [postLogin] = usePostLoginMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = (await postLogin(data).unwrap()) as LoginResponse;
      if (response.success) {
        notifySuccess(response.message);
        const decryptedData: DecryptedData | null = decryptObject(
          response.data
        );
        if (decryptedData) {
          const { id = "", email = "", name = "" } = decryptedData;

          dispatch(
            setUser({
              id,
              email,
              name,
              isAuthenticated: true,
            })
          );
          window.location.reload();
        }
      } else {
        notifyError(response.message);
      }
    } catch (error) {
      console.error("Login failed, error:", error);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <h1>Welcome Back</h1>
        <span className="sub-header sub-header--primary margin-top-small margin-bottom-medium">
          Please sign in to access your application
        </span>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            formHandle={register("email")}
            inputProps={{
              name: "email",
              placeholder: "Email",
              label: "Email",
              errorMessage: errors.email?.message || "",
            }}
          />
          <FormInput
            formHandle={register("password")}
            inputProps={{
              name: "password",
              type: passwordType(isPasswordVisible),
              placeholder: "Password",
              icon: passwordIcon(isPasswordVisible),
              onIconClick: () => setIsPasswordVisible(!isPasswordVisible),
              isIconPointer: true,
              label: "Password",
              errorMessage: errors.password?.message || "",
            }}
          />
          <Button title="Log In" className="margin-top-small" />
        </Form>
        <div className="login-bottom">
          <a href="/registration" className="forgot-password">
            Don't have an account yet? Sign Up
          </a>
          <a href="/forgotpassword" className="forgot-password">
            Forgot Password?
          </a>
          <span>
            By continuing you are agreeing to the {""}
            <a href={Constant.TERMSOFUSELINK} target="_blank" rel="noreferrer">
              Terms of Use
            </a>
          </span>
        </div>
      </div>
      <PrivacyPolicy privacyLink={Constant.PARTNERSLINK} />
    </div>
  );
}
