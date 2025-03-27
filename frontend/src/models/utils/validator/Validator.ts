import type { ValidatorOptions } from './ValidatorOptions';

export interface Validator {
  validate(value: string, options: ValidatorOptions): string[];
}
