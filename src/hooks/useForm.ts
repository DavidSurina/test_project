import { useState, ChangeEvent, FormEvent, FocusEvent } from "react";

import { ErrorsType, ValuesType } from "../components/FormGenerator/types";
import { validatePatterns } from "../globals/functions";
import {
  DataObjectType,
  FormFieldType,
  PatternType,
  validation,
} from "../globals/mockObjects";

export type UseFormProps<T> = {
  dataObject: DataObjectType;
  onSubmit?: (values: T) => void;
};

const useForm = <T>({ dataObject, onSubmit }: UseFormProps<T>) => {
  const { formFields } = dataObject;

  const [values, setValues] = useState<ValuesType>({});
  const [errors, setErrors] = useState<ErrorsType>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked, type } = e.target;

    if (type === "checkbox") {
      setValues((prev) => ({ ...prev, [id]: `${checked}` }));
    } else {
      setValues((prev) => ({ ...prev, [id]: value }));
    }
  };

  const validateField = (field: FormFieldType, value?: string | number) => {
    console.log("validate field");
    let fieldErrors: string[] = [];
    const _value = value ? value : values[field.name];
    if (
      (field.validationRules.isRequired && !_value) ||
      (field.fieldType === "checkbox" && values[field.name] !== "true")
    ) {
      console.log("triggered", values);
      fieldErrors = ["Field is required"];
      return fieldErrors;
    }

    if (field.name === "password_repeat") {
      const pwInput = values["password"];
      if (
        typeof pwInput === "string" &&
        pwInput !== values["password_repeat"]
      ) {
        fieldErrors = [...fieldErrors, "Field does not have same value."];
      }
    }

    Object.entries(field.validationRules).forEach(([ruleKey, rule]) => {
      if (ruleKey === "patterns") {
        const patternErrors = validatePatterns(
          _value as string,
          rule as PatternType[]
        );
        fieldErrors = [...fieldErrors, ...patternErrors];
      } else {
        const { validate, errorMessage } = validation[ruleKey];
        if (!validate(values[field.name], rule)) {
          fieldErrors = [...fieldErrors, errorMessage];
        }
      }
    });
    return fieldErrors;
  };

  const validateAllFields = () => {
    if (errors) {
      setErrors({});
    }
    let allErrors: ErrorsType = {};

    formFields.forEach((field) => {
      const inputErrors = validateField(field);

      allErrors = { ...allErrors, [field.name]: inputErrors };
    });

    return allErrors;
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { id, value, checked } = e.currentTarget;
    const field = formFields.find((f) => f.name === id);
    setErrors((prev) => ({ ...prev, [id]: [] }));
    let currentErrors: string[] = [];
    if (field?.fieldType === "checkbox") {
      currentErrors = checked ? [] : ["Field is required"];
    } else {
      currentErrors = validateField(field as FormFieldType, value);
    }

    if (currentErrors.length > 0) {
      setErrors((prev) => ({ ...prev, [id]: currentErrors }));
    }
  };

  const handleSumbit = (e: FormEvent) => {
    e.preventDefault();
    // validation
    const validate = validateAllFields();
    const submitCondition =
      Object.values(validate).filter((v) => v.length > 0).length > 0;
    if (submitCondition) {
      setErrors(validate);
      return;
    } else if (onSubmit) {
      // on submit
      onSubmit(values);
    }
  };

  return {
    handleChange,
    handleSumbit,
    values,
    errors,
    handleBlur,
  };
};

export default useForm;
