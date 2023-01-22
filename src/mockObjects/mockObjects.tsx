export type FormFieldType = {
  label: string;
  fieldType: "text" | "email" | "password" | "password_repeat";
  minLength: number;
  maxLength: number;
};

export type DataObjectType = {
  formFields: Array<FormFieldType>;
  submitBtnLabel: string;
};

const mockPw: FormFieldType = {
  label: "Password",
  fieldType: "password",
  minLength: 8,
  maxLength: 20,
};

const mockPw_repeat: FormFieldType = {
  label: "Password",
  fieldType: "password_repeat",
  minLength: 8,
  maxLength: 20,
};

const mockEmail: FormFieldType = {
  label: "Email",
  fieldType: "email",
  minLength: 8,
  maxLength: 40,
};

const mockName: FormFieldType = {
  label: "Full Name",
  fieldType: "text",
  minLength: 5,
  maxLength: 25,
};

export const mockObj_registration: DataObjectType = {
  formFields: [mockEmail, mockName, mockPw_repeat],
  submitBtnLabel: "Registration",
};

export const mockObj_login = {
  formFields: [mockEmail, mockPw],
  submitBtnLabel: "Login",
};
