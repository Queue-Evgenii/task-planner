import type { Validator } from './Validator';
import type { ValidatorOptions } from './ValidatorOptions';

export class SimpleValidator implements Validator {
  validate(value: string, options: ValidatorOptions): string[] {
    const errors: string[] = [];

    if (options.required && value.length === 0) {
      errors.push('Field is required!');
    }
    if (options.min !== undefined && value.length < options.min) {
      errors.push(`Field should be longer than ${options.min}`);
    }
    if (options.max !== undefined && value.length > options.max) {
      errors.push(`Field should be smaller than ${options.max}`);
    }
    if (options.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      errors.push('Field should accept pattern (example@example.example)!');
    }
    if (options.regex && options.regex.pattern && !options.regex.pattern.test(value)) {
      errors.push(options.regex.message);
    }

    return errors;
  }
}
