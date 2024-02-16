// @ts-nocheck
import { forwardRef } from "react";

type FormProps = Omit<
  React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >,
  "onSubmit"
> & {
  onSubmit: () => void;
};

const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ children, onSubmit, ...props }, ref) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      return onSubmit();
    };
    return (
      <form {...props} onSubmit={handleSubmit} ref={ref}>
        {children}
      </form>
    );
  }
);

export default Form;
