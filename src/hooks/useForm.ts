import { useState, ChangeEvent, FormEvent, FocusEvent } from "react";
import {
  ErrorsType,
  ValuesType,
  WasFieldTouchedType,
} from "../components/FormGenerator/types";
import { validatePatterns } from "../globals/functions";
import {
  DataObjectType,
  FormFieldType,
  PatternType,
  validation,
} from "../globals/mockObjects";

export type UseFormProps<T> = {
  dataObject: DataObjectType;
  onSumbit?: (values: T) => void;
};

const useForm = <T>({ dataObject, onSumbit }: UseFormProps<T>) => {
  const { formFields } = dataObject;
  const requiredFieldsCount = formFields.map(
    (f) => f.validationRules.isRequired
  );
  const [values, setValues] = useState<ValuesType>({});
  const [errors, setErrors] = useState<ErrorsType>({});
  const [wasFieldTouched, setWasFieldTouched] = useState<WasFieldTouchedType>(
    {}
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(id, value, e.target);
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const validateField = (field: FormFieldType, value?: string | number) => {
    console.log("validate field");
    let fieldErrors: string[] = [];
    const _value = value ? value : values[field.name];
    if (field.validationRules.isRequired && !_value) {
      fieldErrors = ["Field is required"];
      return fieldErrors;
    }
    console.log("got past first");
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
          value as string,
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
    console.log(fieldErrors);
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
    const { id, value } = e.currentTarget;
    const field = formFields.find((f) => f.name === id);
    setErrors((prev) => ({ ...prev, [id]: [] }));

    console.log("blur triggered");

    const errors = validateField(field as FormFieldType, value);
    console.log(errors);
    if (errors.length > 0) {
      setErrors((prev) => ({ ...prev, [id]: errors }));
    }
  };

  const handleSumbit = (e: FormEvent) => {
    e.preventDefault();
    // validation
    const validate = validateAllFields();
    // ustawienie disabled

    if (Object.keys(validate).length > 0) {
      setErrors(validate);
      return;
    } else if (onSumbit) {
      // on submit
      // onSumbit(values);
    }
  };

  return {
    handleChange,
    handleSumbit,
    values,
    errors,
    wasFieldTouched,
    handleBlur,
    isSubmitDisabled,
  };
};

export default useForm;
