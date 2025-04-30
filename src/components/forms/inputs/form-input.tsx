import { ErrorMessage } from "@hookform/error-message";
import get from "lodash/get";
import { ReactNode } from "react";
import { DeepMap, FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import TextInput from "./text-Input"; // 👈 Importa tu TextInput
import classNames from "classnames";
import { FieldErrors } from "react-hook-form";

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions<TFormValues, Path<TFormValues>>;
  register?: UseFormRegister<TFormValues>;
  errors?: FieldErrors<TFormValues>;
  inputClassName?: string;
  label?: string;
  right?: ReactNode;
  border?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

export const FormInput = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  inputClassName,
  label,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div className={classNames("", className)} aria-live="polite">
      <TextInput
        {...props}
        name={name}
        label={label}
        error={hasError ? (errorMessages as unknown as FieldError)?.message : ""}
        className={inputClassName}
        {...(register && register(name, rules))}
      />
    </div>
  );
};
