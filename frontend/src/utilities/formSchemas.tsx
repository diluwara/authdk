import { z } from "zod";

import * as Constant from "./Constant";

export const email = z
  .string()
  .min(1, { message: Constant.REQUIRED_EMAIL })
  .email({ message: Constant.INVALID_EMAIL_ERROR });

export const password_input = z
  .string()
  .min(1, { message: Constant.REQUIRED_PASSWORD });

export const confirm_password = z
  .string()
  .min(1, { message: "Please confirm your password" });

export const name = z.string().min(1, { message: "Please enter your name" });

export const otp = z
  .string({ required_error: "Verification code is required" })
  .min(6, "Verification code should be 6 digits");

export const monthandyear = z.object({
  month: z.string().min(1, "Please select a month"),
  year: z.string().min(1, "Please select a year"),
});

export const ssn = z
  .string()
  .min(1, "Please enter your social security number")
  .regex(
    /^\d{3}-\d{2}-\d{4}|\d{9}$/,
    "Please enter your valid social security number "
  );

export type Schema = Record<string, z.ZodTypeAny>;

export const schemas: Schema = {
  email,
  monthandyear,
  ssn,
};
