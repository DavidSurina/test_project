import { PatternType } from "./mockObjects";

export function validatePatterns(value: string, patterns: PatternType[]) {
  let patternErrors: string[] = [];

  patterns.forEach((r) => {
    if (validatePattern(r.pattern, value)) {
      patternErrors = [...patternErrors, r.errorMessage];
    }
  });

  return patternErrors;
}

export function validatePattern(pattern: string, value: string) {
  const regExp = new RegExp(pattern);
  console.log(regExp.test(value), regExp, value);

  return regExp.test(value);
}
