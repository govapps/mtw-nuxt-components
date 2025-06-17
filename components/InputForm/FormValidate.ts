import type InputValidate from "./InputValidate";

export default class FormValidate {

  readonly inputValidate: InputValidate[];

  errors: ValidateI[] = [];

  constructor (inputValidate: InputValidate[]) {
    this.inputValidate = inputValidate;
  }

  getInputValidate (name: string) {
    return this.inputValidate.find(i => i.name === name);
  }

  validate () {
    this.inputValidate.forEach(i => i.validate());
    this.retiveErros();
  }

  setValue (name: string, value: string) {
    this.inputValidate
      .find(i => i.name === name)
      ?.setValue(value);
  }

  retiveErros () {
    this.errors = [];

    this.inputValidate.forEach((input) => {
      if (input.errors.length) {
        this.errors = [...this.errors, ...input.errors];
      }
    });
  }

  hasError () {
    return this.errors.length > 0;
  }

  getData () {
    const data = {} as Record<string, unknown>;

    this.inputValidate.forEach((input) => {
      data[input.name] = input.getFormatedValue();
    });

    return data;
  }

}
