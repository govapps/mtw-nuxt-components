export default class InputValidate {
  value: string = "";

  format: InputValidateI["format"];

  errors: ValidateI[] = [];

  readonly name: string;

  readonly validations: ValidateI[];

  constructor(inputValidate: InputValidateI){
    this.name = inputValidate.name;
    this.format = inputValidate.format;
    this.validations = inputValidate.validations ?? [];
  }

  setValue(value: string){
    this.value = value;
  }

  getFormatedValue(){
    if(this.format){
      return this.format(this.value);
    }

    return this.value;
  }

  validate(){
    this.errors = [];

    this.validations.forEach((validation) => {
      if(!validation.validate(this.value)){
        this.errors.push(validation);
      }
    });
  }

  hasError(){
    return this.errors.length > 0;
  }
}