export type PatternType = {
  pattern: string;
  errorDesc: string;
};

export type FormFieldType = {
  id: string;
  label: string;
  fieldType: "text" | "email" | "password" | "password_repeat";
  value: string;
  minLength: number;
  maxLength: number;
  isRequired: true;
  isValid: boolean;
  patterns: Array<PatternType>;
  errors: Array<string>;
};

export type DataObjectType = {
  formFields: Array<FormFieldType>;
  submitBtnLabel: string;
};

const mockPw: FormFieldType = {
  id: "312414124124dzxcasdada12",
  label: "Password",
  fieldType: "password",
  value: "",
  minLength: 8,
  maxLength: 20,
  isRequired: true,
  isValid: false,
  patterns: [
    {
      pattern: "[a-z]",
      errorDesc: "Must contain lower case character",
    },
    {
      pattern: "[A-Z]",
      errorDesc: "Must contain upper case character",
    },
    {
      pattern: ".*[0-9].*",
      errorDesc: "Must contain number",
    },
    {
      pattern: "[^A-Za-z0-9s]",
      errorDesc: "Must contain special character",
    },
  ],
  errors: [],
};

const mockPw_repeat: FormFieldType = {
  id: "213241241mnxbczkjdqasoihn12jk3",
  label: "Password repeat",
  value: "",
  fieldType: "password_repeat",
  minLength: 8,
  maxLength: 20,
  isRequired: true,
  isValid: false,
  patterns: [
    {
      pattern: "",
      errorDesc: "",
    },
  ],
  errors: [],
};

const mockEmail: FormFieldType = {
  id: "2312312dasdaklsjdeqowpeiqoepuu414",
  label: "Email",
  value: "",
  fieldType: "email",
  minLength: 8,
  maxLength: 40,
  isRequired: true,
  isValid: false,
  patterns: [
    {
      pattern:
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
      errorDesc: "Field must be in email format e.g.'test@test.com'",
    },
  ],
  errors: [],
};

const mockName: FormFieldType = {
  id: "31231dnzx,mcnsklejqe12op311op23j1o2p3",
  label: "Name",
  value: "",
  fieldType: "text",
  minLength: 5,
  maxLength: 25,
  isRequired: true,
  isValid: false,
  patterns: [
    {
      pattern: "^[a-zA-z]+([s][a-zA-Z]+)*$",
      errorDesc: "Field can only contain letters",
    },
  ],
  errors: [],
};

export const mockObj_registration: DataObjectType = {
  formFields: [mockEmail, mockName, mockPw, mockPw_repeat],
  submitBtnLabel: "Registration",
};
