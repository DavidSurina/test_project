import React, { SyntheticEvent, useEffect, useState } from "react";
import { DataObjectType } from "../../globals/mockObjects";
import InputField from "./InputField/InputField";

type PropTypes = {
  dataObject: DataObjectType;
};

function FormGenerator(props: PropTypes): JSX.Element {
  const { dataObject } = props;
  const { formFields, submitBtnLabel } = dataObject;
  const [fields, setFields] = useState(formFields);
  const [isDisabled, setIsDisabled] = useState(true);

  function onSumbit(e: SyntheticEvent): void {
    e.preventDefault();
    console.log("submitted");
  }

  useEffect(() => {
    const isNoError = fields.filter(
      (field) => field.errors.length !== 0 && field.value.length !== 0
    );
    const isAllValid = fields.filter((field) => field.isValid === true);
    console.log("triggered", isNoError.length, isAllValid.length, isDisabled);
    if (isNoError.length === 0 && isAllValid.length === fields.length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [fields]);

  return (
    <form onSubmit={onSumbit}>
      <>
        {fields.map((field, index) => {
          return (
            <InputField
              field={field}
              fields={fields}
              setFields={setFields}
              index={index}
              key={index}
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
