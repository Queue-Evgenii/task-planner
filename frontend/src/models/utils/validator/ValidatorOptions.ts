export interface ValidatorOptions
  extends
    ValidatorRequiredOption,
    ValidatorEmailOption,
    ValidatorMinMaxOption,
    ValidatorRegexOption {}

export interface ValidatorRequiredOption {
  required?: boolean;
}
export interface ValidatorEmailOption {
  email?: boolean;
}
export interface ValidatorMinMaxOption {
  min?: number;
  max?: number;
}
export interface ValidatorRegexOption {
  regex?: {
    pattern: RegExp;
    message: string;
  };
}
