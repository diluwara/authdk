import { UseFormRegisterReturn } from "react-hook-form";
import { Input, InputProps } from "components/ui/input/Input";

/**
 * Wrapper component to encapsulate React hook Form handle logic with primitive input component
 */

interface FormInputProps {
  /**Form handle returned from register function in React Hook Form */
  formHandle: UseFormRegisterReturn;
  /**Input props required for primitive input component */
  inputProps: InputProps;
}

export const FormInput = ({ formHandle, inputProps }: FormInputProps) => {
  return (
    <Input
      //userdefined props
      {...inputProps}
      //formhandle props
      ref={formHandle.ref}
      name={formHandle.name as unknown as string}
      // value={formHandle.value} TODO
      //merging userdefined event handlers and rhf form event handlers
      onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
        await formHandle.onChange(e);
        inputProps.onChange?.(e);
      }}
      onBlur={async (e: React.ChangeEvent<HTMLInputElement>) => {
        await formHandle.onBlur(e);
        inputProps.onBlur?.(e);
      }}
    />
  );
};
