import React, {
  useState,
  ChangeEvent,
  SetStateAction,
  Dispatch,
  HTMLProps,
} from "react";

import ErrorField from "../ErrorField/ErrorField";

import { FormFieldType } from "../../../globals/mockObjects";

interface PropTypes {
  field: FormFieldType;
  errors: string[];
}

function InputField(
  props: HTMLProps<HTMLInputElement> & PropTypes
): JSX.Element {
  const { field, errors, value, onChange, onBlur } = props;
  const { label, fieldType, name } = field;

  return (
    <div className="flex flex-col justify-around p-4 pb-0">
      <label htmlFor={name}>{label}</label>
      <input
        type={fieldType === "password_repeat" ? "password" : fieldType}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <ErrorField errors={errors} />
    </div>
  );
}

export default InputField;
