interface InputValidateI {
  name: string;
  format?: (value: string) => unknown;
  validations?: ValidateI[];
}

interface ValidateI {
  name: string;
  message: string;
  validate: (value: string) => boolean;
}