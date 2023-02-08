import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

import InputField from "./InputField/InputField";

import {
  DataObjectType,
  PatternType,
  patternValidate,
  validation,
} from "../../globals/mockObjects";

type PropTypes = {
  dataObject: DataObjectType;
};

export type ValuesType = Record<string, string>;
export type ErrorsType = Record<string, Array<string>>;
export type WasFieldUsedType = Record<string, boolean>;

function FormGenerator(props: PropTypes): JSX.Element {
  const { dataObject } = props;
  const { formFields: fields, submitBtnLabel } = dataObject;

  const [values, setValues] = useState<ValuesType>({});
  const [errors, setErrors] = useState<ErrorsType>({});
  const [wasFieldUsed, setWasFieldUsed] = useState<WasFieldUsedType>({});
  const [isDisabled, setIsDisabled] = useState(true);

  // creates an object for every required field
  useEffect(() => {
    const requiredFields: WasFieldUsedType = {};

    fields.forEach((field) => {
      if (field.validationRules.isRequired) {
        requiredFields[field.name] = false;
      }
    });

    setWasFieldUsed(requiredFields);
  }, []);

  // checks if submit should be disabled
  useEffect(() => {
    const wasEveryFieldUsed = Object.values(wasFieldUsed).every(
      (v) => v === true
    );
    if (
      wasEveryFieldUsed &&
      Object.values(errors).every((item) => item.length === 0)
    ) {
      setIsDisabled(false);
    } else if (
      isDisabled === false &&
      !Object.values(errors).every((item) => item.length === 0)
    ) {
      setIsDisabled(true);
    }
  }, [errors]);

  function onSumbit(e: SyntheticEvent): void {
    e.preventDefault();
    console.log("submitted");
  }

  const handleInputChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (name: string) => {
    if (errors.name) {
      setErrors((prev) => ({ ...prev, [name]: [] }));
    }
    let inputErrors: Array<string> = [];
    const field = fields.find((item) => item.name === name);

    if (!field) return;

    // if the field is password repeat - check for same value in password field
    if (field.name === "password_repeat") {
      const pwInput = values["password"];
      if (
        typeof pwInput === "string" &&
        pwInput !== values["password_repeat"]
      ) {
        inputErrors = [...inputErrors, "Field does not have same value."];
      }
    }

    Object.entries(field.validationRules).forEach(([ruleKey, rule]) => {
      if (ruleKey === "patterns") {
        (rule as PatternType[]).forEach((r) => {
          if (!patternValidate(r.pattern, values[name])) {
            inputErrors = [...inputErrors, r.errorMessage];
          }
        });
      } else {
        const { validate, errorMessage } = validation[ruleKey];
        if (!validate(values[name], rule)) {
          inputErrors = [...inputErrors, errorMessage];
        }
      }
    });

    setErrors((prev) => ({ ...prev, [name]: inputErrors }));
  };

  return (
    <form onSubmit={onSumbit}>
      <>
        {fields.map((field, index) => {
          return (
            <InputField
              field={field}
              onBlur={() => handleBlur(field.name)}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(field.name, e.target.value)
              }
              errors={errors[field.name]}
              key={index}
              value={values[field.name]}
            />
          );
        })}
        <button
          type="submit"
          className="px-4 py-2 mt-3 shadow-sm text-gray-900 self-center bg-white border-2 border-gray-900 rounded-sm hover:shadow-lg disabled:text-gray-500 disabled:border-gray-400 disabled:bg-gray-300 disabled:hover:shadow-none"
          disabled={isDisabled}
        >
          {submitBtnLabel}
        </button>
      </>
    </form>
  );
}

export default FormGenerator;
