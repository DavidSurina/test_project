import React, { ChangeEvent, useState } from "react";

import InputField from "./InputField/InputField";

import { DataObjectType } from "../../globals/mockObjects";
import Checkbox from "./Checkbox/Checkbox";
import { WasFieldTouchedType } from "./types";
import useForm from "../../hooks/useForm";

type PropTypes = {
  dataObject: DataObjectType;
};

function FormGenerator(props: PropTypes): JSX.Element {
  const { dataObject } = props;
  const { formFields: fields, submitBtnLabel } = dataObject;

  const [isDisabled, setIsDisabled] = useState(true);

  const { handleChange, handleSumbit, values, errors, wasFieldTouched } =
    useForm({
      dataObject,
    });

  // creates an object for every required field
  // useEffect(() => {
  //   const requiredFields: WasFieldTouchedType = {};

  //   fields.forEach((field) => {
  //     if (field.validationRules.isRequired) {
  //       console.log("triggered");
  //       requiredFields[field.name] = false;
  //     }
  //   });
  //   setWasFieldUsed(requiredFields);
  // }, []);

  // // checks if submit should be disabled
  // useEffect(() => {
  //   const wasEveryFieldUsed =
  //     Object.keys(wasFieldUsed).length === 0 &&
  //     Object.values(wasFieldUsed).every((v) => v);
  //   const isErrorEmpty =
  //     Object.keys(errors).length > 0 &&
  //     Object.values(errors).every((item) => item.length === 0);

  //   if (wasEveryFieldUsed && isErrorEmpty) {
  //     setIsDisabled(false);
  //   } else if (
  //     !isDisabled &&
  //     !Object.values(errors).every((item) => item.length === 0)
  //   ) {
  //     setIsDisabled(true);
  //   }
  // }, [wasFieldUsed, errors]);

  // function onSumbit(e: SyntheticEvent): void {
  //   e.preventDefault();
  //   console.log("submitted");
  // }

  // const handleInputChange = (name: string, value: string) => {
  //   setValues((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleBlur = (name: string) => {
  //   if (errors.name) {
  //     setErrors((prev) => ({ ...prev, [name]: [] }));
  //   }
  //   let inputErrors: Array<string> = [];
  //   const field = fields.find((item) => item.name === name);

  //   if (!field || !values[name]) return;

  //   // if the field is password repeat - check for same value in password field
  //   if (field.name === "password_repeat") {
  //     const pwInput = values["password"];
  //     if (
  //       typeof pwInput === "string" &&
  //       pwInput !== values["password_repeat"]
  //     ) {
  //       inputErrors = [...inputErrors, "Field does not have same value."];
  //     }
  //   }

  //   Object.entries(field.validationRules).forEach(([ruleKey, rule]) => {
  //     if (ruleKey === "patterns") {
  //       (rule as PatternType[]).forEach((r) => {
  //         if (!validatePattern(r.pattern, values[name])) {
  //           inputErrors = [...inputErrors, r.errorMessage];
  //         }
  //       });
  //     } else {
  //       const { validate, errorMessage } = validation[ruleKey];
  //       if (!validate(values[name], rule)) {
  //         inputErrors = [...inputErrors, errorMessage];
  //       }
  //     }
  //   });

  //   setErrors((prev) => ({ ...prev, [name]: inputErrors }));
  //   setWasFieldUsed((prev) => ({ ...prev, [name]: true }));
  // };

  return (
    <form onSubmit={handleSumbit}>
      <>
        {fields.map((field, index) => {
          if (field.fieldType === "checkbox") {
            return (
              <Checkbox
                field={field}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                errors={errors[field.name]}
                key={index}
                value={values[field.name]}
              />
            );
          }
          return (
            <InputField
              field={field}
              onBlur={() => handleBlur(field.name)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
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
