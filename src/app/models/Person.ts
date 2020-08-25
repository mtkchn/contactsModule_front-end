import { Contact } from './Contact';

export class Person {
  surname: string;
  pesel: number;

  // tslint:disable-next-line: max-line-length
  constructor(surname: string, pesel: number) {
    this.surname = surname;
    this.pesel = pesel;
  }
}
