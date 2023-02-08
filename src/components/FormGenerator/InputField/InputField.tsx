import React, { HTMLProps } from "react";

import ErrorField from "../ErrorField/ErrorField";

import { FormFieldType } from "../../../globals/mockObjects";

interface PropTypes {
  field: FormFieldType;
  errors: string[];
}

function InputField(
  props: HTMLProps<HTMLInputElement> & PropTypes
): JSX.Element {
  const { field, errors } = props;
  const { label, fieldType, name } = field;

  return (
    <div className="flex flex-col justify-around p-4 pb-0">
      <label htmlFor={name}>{label}</label>
      <input type={fieldType} id={name} {...props} />
      <ErrorField errors={errors} />
    </div>
  );
}

export default InputField;
