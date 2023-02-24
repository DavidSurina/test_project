import React, { HTMLProps } from "react";
import { FormFieldType } from "../../../globals/mockObjects";
import ErrorField from "../ErrorField/ErrorField";

interface PropTypes {
  errors: string[];
  field: FormFieldType;
}

function Checkbox(props: HTMLProps<HTMLInputElement> & PropTypes): JSX.Element {
  const { errors, field, ...otherProps } = props;
  const { label, name, fieldType } = field;
  return (
    <div className="flex flex-col justify-evenly m-4">
      <div className="flex flex-row justify-start">
        <input
          placeholder={fieldType}
          type={fieldType}
          className="pr-4"
          id={name}
          {...otherProps}
        />
        <span className="ml-2">{label}</span>
      </div>
      <ErrorField errors={errors} />
    </div>
  );
}

export default Checkbox;
