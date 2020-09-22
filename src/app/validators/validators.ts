import { FormControl, ValidationErrors } from '@angular/forms';

export function peselValidator(control: FormControl): null | ValidationErrors {
  const hasNumber = /^[0-9]{11}$/.test(control.value);
  const weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let sum = 0;
  let isValid: boolean;
  let dateValid: boolean;
  if (!hasNumber) {
    return { peselError: true };
  }
  if (
    parseInt(control.value.toString().substring(4, 6)) > 31 ||
    parseInt(control.value.toString().substring(2, 4)) > 12
  ) {
    dateValid = false;
  } else {
    dateValid = true;
  }

  let controlNumber = parseInt(control.value.toString().substring(10, 11));
  for (let i = 0; i < weight.length; i++) {
    sum += parseInt(control.value.toString().substring(i, i + 1)) * weight[i];
  }
  sum = sum % 10;
  isValid = (10 - sum) % 10 === controlNumber;

  const peselValid = hasNumber && dateValid && isValid;

  if (!peselValid) {
    return { peselError: true };
  }
  return null;
}

export function regonValidator(control: FormControl): null | ValidationErrors {
  if (!control.value) return null;
  const regon: string = control.value;

  const isOnlyDigit: boolean = /^\d+$/.test(regon);
  if ((regon.length !== 9 && regon.length !== 14) || !isOnlyDigit)
    return { regonError: true };

  let sum: number = 0;
  let weight: Array<number>;

  if (regon.length === 9) {
    weight = [8, 9, 2, 3, 4, 5, 6, 7];
  } else {
    weight = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];
  }

  for (var i = 0; i < regon.length - 1; i++) {
    sum += weight[i] * parseInt(regon.charAt(i));
  }

  let resultControlNumber = sum % 11;
  if (resultControlNumber === 10) resultControlNumber = 0;

  const controlNumber = parseInt(regon.charAt(regon.length - 1));
  if (resultControlNumber !== controlNumber) return { regonError: true };

  return null;
}

export function nipValidator(control: FormControl): null | ValidationErrors {
  if (!control.value) return null;
  const nip: string = control.value.toString().replace(/[\ \-]/gi, '');

  const isOnlyDigit: boolean = /^\d+$/.test(nip);
  if (nip.length !== 10 || !isOnlyDigit) return { nipError: true };

  let sum: number = 0;
  let controlNumber = parseInt(nip.substring(9, 10));
  const weight: Array<number> = [6, 5, 7, 2, 3, 4, 5, 6, 7];

  for (let i = 0; i < weight.length; i++) {
    sum += parseInt(nip.substr(i, 1)) * weight[i];
  }

  const resultControlNumber = sum % 11;
  if (resultControlNumber !== controlNumber) return { nipError: true };

  return null;
}

export function krsValidator(control: FormControl): null | ValidationErrors {
  if (!control.value) return null;
  const krs: string = control.value;

  const isOnlyDigit: boolean = /^\d+$/.test(krs);
  if (!isOnlyDigit) return { krsError: true };
  return null;
}

export function phoneValidator(control: FormControl): null | ValidationErrors {
  const hasNumber = /^(\+48)?\d{9}$/.test(control.value);
  if (!hasNumber) {
    return { phoneError: true };
  }
  return null;
}
