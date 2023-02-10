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
