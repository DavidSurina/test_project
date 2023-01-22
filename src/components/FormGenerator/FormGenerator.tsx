import React, { SyntheticEvent } from "react";
import { DataObjectType } from "../../mockObjects/mockObjects";
import EmailField from "./EmailField/EmailField";

type PropTypes = {
  dataObject: DataObjectType;
};

function FormGenerator(props: PropTypes): JSX.Element {
  const { dataObject } = props;
  const { formFields, submitBtnLabel } = dataObject;

  function onSumbit(e: SyntheticEvent): void {
    e.preventDefault();
    console.log("submit pressed");
  }

  return (
    <form onSubmit={onSumbit}>
      <>
        {formFields.map((field) => {
          return <EmailField field={field} />;
        })}
        <button
          type="submit"
          className="px-4 py-2 mt-3 shadow-sm text-gray-900 self-center bg-white border-gray-900"
        >
          {submitBtnLabel}
        </button>
      </>
    </form>
  );
}

export default FormGenerator;

// add some kind of error fields for validation in components
// add validation for each type of fields - some regex field in FormFieldType
