import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { DataObjectType, validation } from "../../globals/mockObjects";
import InputField from "./InputField/InputField";

type PropTypes = {
  dataObject: DataObjectType;
};

type ValuesType = Record<string, string>
type ErrorsType = Record<string, Array<string>>


function FormGenerator(props: PropTypes): JSX.Element {
  const { dataObject } = props;
  const { formFields: fields, submitBtnLabel } = dataObject;


  const [values, setValues] = useState<ValuesType>({})
  const [errors, setErrors] = useState<ErrorsType>({})
  const [isDisabled, setIsDisabled] = useState(true);

  function onSumbit(e: SyntheticEvent): void {
    e.preventDefault();
    console.log("submitted");
  }

  const handleInputChange = (name: string, value: string) => {
    setValues(prev=>({...prev, [name]: value}))
  }

  const handleBlur = (name: string) => {
    let inputErrors: Array<string> = [];
    const field = fields.find(item => item.name === name);

    if (!field) return;

    Object.entries(field.validationRules).forEach(([ruleKey, rule]) => {
      const { validate, errorMessage } = validation[ruleKey];

      if (!validate(values[name], rule)){
        inputErrors = [...inputErrors, errorMessage];
      }
    })

    setErrors(prev=> ({...prev, [name]: inputErrors}));
  }

  return (
    <form onSubmit={onSumbit}>
      <>
        {fields.map((field, index) => {
          return (
            <InputField
              field={field}
              fields={fields}
              onBlur={() => handleBlur(field.name)}
              onChange={(e:ChangeEvent<HTMLInputElement>)=>handleInputChange(field.name, e.target.value)}
              index={index}
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
