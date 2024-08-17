import { FormEventHandler } from "react";

interface FormProps {
  onSubmit?: FormEventHandler<HTMLFormElement>;
  formClassName?: string;
  children: React.ReactNode;
  withWrapper?: boolean;
}

const Form = ({
  onSubmit,
  formClassName = "form",
  withWrapper = true,
  children,
}: FormProps) => {
  return (
    <form onSubmit={onSubmit} className={formClassName}>
      {withWrapper ? <div className="form__wrapper">{children}</div> : children}
    </form>
  );
};

export default Form;
