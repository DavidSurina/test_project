export type PatternType = {
  pattern: string;
  errorMessage: string;
};

export function patternValidate(pattern: string, value: string) {
  const regExp = new RegExp(pattern);
  console.log(regExp.test(value), regExp, value);
  return regExp.test(value);
}

export const validation: Record<
  string,
  {
    errorMessage: string;
    validate: (
      value: string | number,
      parameters?: unknown
    ) => boolean | typeof patternValidate;
  }
> = {
  minLength: {
    errorMessage: "Is too short",
    validate: (value, parameters) => {
      if ((value as string).length < (parameters as number)) {
        return false;
      }
      return true;
    },
  },
  maxLength: {
    errorMessage: "Is too long",
    validate: (value, parameters) => {
      if ((parameters as number) < (value as string).length) {
        return false;
      }
      return true;
    },
  },
  isRequired: {
    errorMessage: "Is required",
    validate: (value) => {
      if (!value) {
        return false;
      }
      return true;
    },
  },
};

export type ValidationRulesType = {
  minLength?: number;
  maxLength?: number;
  isRequired?: true;
  patterns?: PatternType[];
};

export type FormFieldType = {
  name: string;
  label: string;
  fieldType: "text" | "email" | "password";
  validationRules: ValidationRulesType;
};

export type DataObjectType = {
  formFields: FormFieldType[];
  submitBtnLabel: string;
};

const mockPw: FormFieldType = {
  name: "password",
  label: "Password",
  fieldType: "password",
  validationRules: {
    minLength: 8,
    maxLength: 20,
    isRequired: true,
    patterns: [
      {
        pattern: "[a-z]",
        errorMessage: "Must contain lower case character",
      },
      {
        pattern: "[A-Z]",
        errorMessage: "Must contain upper case character",
      },
      {
        pattern: ".*[0-9].*",
        errorMessage: "Must contain number",
      },
      {
        pattern: "[^A-Za-z0-9s]",
        errorMessage: "Must contain special character",
      },
    ],
  },
};

const mockPwRepeat: FormFieldType = {
  name: "password_repeat",
  label: "Password repeat",
  fieldType: "password",
  validationRules: {
    minLength: 8,
    maxLength: 20,
    isRequired: true,
    patterns: [],
  },
};

const mockEmail: FormFieldType = {
  name: "email",
  label: "Email",
  fieldType: "email",
  validationRules: {
    minLength: 8,
    maxLength: 40,
    isRequired: true,
    patterns: [
      {
        pattern:
          "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
        errorMessage: "Field should be in email format eg.test@email.com",
      },
    ],
  },
};

const mockName: FormFieldType = {
  name: "name",
  label: "Name",
  fieldType: "text",
  validationRules: {
    minLength: 5,
    maxLength: 25,
    isRequired: true,
    patterns: [
      {
        pattern: "^[a-zA-z]+([s][a-zA-Z]+)*$",
        errorMessage: "Field can only contain letters",
      },
    ],
  },
};

export const mockObj_registration: DataObjectType = {
  formFields: [mockEmail, mockName, mockPw, mockPwRepeat],
  submitBtnLabel: "Registration",
};
