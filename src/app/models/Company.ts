import { Contact } from './Contact';
import { Employee } from './Employee';

export class Company {
  nip: number;
  regon: number;
  krs: number;
  legalForm: string;
  employee: Employee[];

  constructor(nip: number, regon: number, krs: number, legalForm: string) {
    this.nip = nip;
    this.regon = regon;
    this.krs = krs;
    this.legalForm = legalForm;
    this.employee = [];
  }
}
