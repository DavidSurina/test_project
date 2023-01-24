import React, { useState, ChangeEvent, SetStateAction, Dispatch } from "react";
import { FormFieldType } from "../../../globals/mockObjects";
import ErrorField from "../ErrorField/ErrorField";

interface PropTypes {
  field: FormFieldType;
  fields: Array<FormFieldType>;
  setFields: Dispatch<SetStateAction<Array<FormFieldType>>>;
  index: number;
}

function InputField(props: PropTypes): JSX.Element {
  const { field, fields, setFields, index } = props;
  const {
    label,
    fieldType,
    minLength,
    maxLength,
    isRequired,
    id,
    patterns,
    errors,
  } = field;
  const [userInput, setUserInput] = useState("");

  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    setUserInput(event.target.value);
  }

  const onBlur = (event: ChangeEvent<HTMLInputElement>): void => {
    const _fields = [...fields];
    const _field = _fields[index];

    if (_field.errors.length > 0) {
      _field.errors = [];
    }

    if (event.target.value.length < 1) {
      _field.errors.push("This field cannot be empty");
    } else if (
      fieldType === "password_repeat" &&
      fields[index - 1].value !== event.target.value
    ) {
      console.log(fields[index - 1].value, "test", event.target.value);
      console.log("triggered", _field.errors);
      _field.errors.push("Passwords are not same");
    } else {
      patterns.forEach((a) => {
        const regExp = new RegExp(a.pattern);
        const test = regExp.test(event.target.value);
        if (!test) {
          _field.errors.push(a.errorDesc);
        }
      });
    }
    if (!(_field.errors.length > 0)) {
      _field.isValid = true;
    }

    setFields(_fields);
  };

  return (
    <div className="flex flex-col justify-around p-4 pb-0">
      <label htmlFor={id}>{label}</label>
      <input
        type={fieldType === "password_repeat" ? "password" : fieldType}
        id={id}
        minLength={minLength}
        maxLength={maxLength}
        value={userInput}
        onChange={(e) => onChange(e)}
        onBlur={(e) => onBlur(e)}
        required={isRequired}
      />
      <ErrorField errors={errors} />
    </div>
  );
}

export default InputField;
