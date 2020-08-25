import { Contact } from './Contact';
import { Emploee } from './Emploee';

export class Company {
  nip: number;
  regon: number;
  krs: number;
  legalForm: string;
  employee: Emploee[];

  constructor(nip: number, regon: number, krs: number, legalForm: string) {
    this.nip = nip;
    this.regon = regon;
    this.krs = krs;
    this.legalForm = legalForm;
    this.employee = [];
  }
}
