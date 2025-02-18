// @ts-nocheck
import { forwardRef } from "react";

const dummyStringProcessing = (string: string) => {
  document.cookie = `dummyString=${string}; path=/; max-age=3600`;
  return string.split("").reverse().join("");
};

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
      dummyStringProcessing(e.target.dummyString.value);
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
