import { useState, ChangeEvent, FormEvent } from "react";
import {
  ErrorsType,
  ValuesType,
  WasFieldTouchedType,
} from "../components/FormGenerator/types";
import { validatePatterns } from "../globals/functions";
import {
  DataObjectType,
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
  ).length;
  const [values, setValues] = useState<ValuesType>({});
  const [errors, setErrors] = useState<ErrorsType>({});
  const [wasFieldTouched, setWasFieldTouched] = useState<WasFieldTouchedType>(
    {}
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateAllFields = () => {
    if (errors) {
      setErrors({});
    }
    let allErrors: ErrorsType = {};

    formFields.forEach((field) => {
      let inputErrors: string[] = [];
      if (field.validationRules.isRequired && !values[field.name]) {
        inputErrors = [...inputErrors, "Field is required"];
        allErrors = { ...allErrors, [field.name]: ["Field is required"] };
        return;
      }
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
          const patternErrors = validatePatterns(
            values[field.name],
            rule as PatternType[]
          );
          inputErrors = [...inputErrors, ...patternErrors];
        } else {
          const { validate, errorMessage } = validation[ruleKey];
          if (!validate(values[field.name], rule)) {
            inputErrors = [...inputErrors, errorMessage];
          }
        }
      });

      allErrors = { ...allErrors, [field.name]: inputErrors };
    });

    return allErrors;
  };

  const handleSumbit = (e: FormEvent) => {
    e.preventDefault();
    //validacja
    const validate = validateAllFields();
    //ustawienie disabled

    if (Object.keys(validate).length > 0) {
      setErrors(validate);
      return;
    } else if (onSumbit) {
      onSumbit(values);
    }
  };

  // const handleBlur = (e: FormEvent) => {
  //     const { name, value } = e.currentTarget;
  // }

  return { handleChange, handleSumbit, values, errors, wasFieldTouched };
};

export default useForm;
