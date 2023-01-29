import React, { useState, ChangeEvent, SetStateAction, Dispatch, HTMLProps } from "react";
import { FormFieldType } from "../../../globals/mockObjects";
import ErrorField from "../ErrorField/ErrorField";

interface PropTypes {
  field: FormFieldType;
  fields: Array<FormFieldType>;
  index: number;
  errors: Array<string>
}

function InputField(props: HTMLProps<HTMLInputElement> & PropTypes ): JSX.Element {
  const { field, fields, errors, index, value, onChange, onBlur } = props;
  const {
    label,
    fieldType,
    name
  } = field;

  // const onBlur = (event: ChangeEvent<HTMLInputElement>): void => {
    // const _fields = [...fields];
    // const _field = _fields[index];
    //
    // if (_field.errors.length > 0) {
    //   _field.errors = [];
    // }
    //
    // if (event.target.value.length < 1) {
    //   _field.errors.push("This field cannot be empty");
    // } else if (
    //   fieldType === "password_repeat" &&
    //   fields[index - 1].value !== event.target.value
    // ) {
    //   console.log(fields[index - 1].value, "test", event.target.value);
    //   console.log("triggered", _field.errors);
    //   _field.errors.push("Passwords are not same");
    // } else {
    //   patterns.forEach((a) => {
    //     const regExp = new RegExp(a.pattern);
    //     const test = regExp.test(event.target.value);
    //     if (!test) {
    //       _field.errors.push(a.errorDesc);
    //     }
    //   });
    // }
    // if (!(_field.errors.length > 0)) {
    //   _field.isValid = true;
    // }
    //
    // setFields(_fields);
  // };

  return (
    <div className="flex flex-col justify-around p-4 pb-0">
      <label htmlFor={name}>{label}</label>
      <input
        type={fieldType === "password_repeat" ? "password" : fieldType}
        id={name}
        name={name}
        // minLength={minLength}
        // maxLength={maxLength}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        // required={isRequired}
      />
      {/*<ErrorField errors={errors} />*/}
    </div>
  );
}

export default InputField;
