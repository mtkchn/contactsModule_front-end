import { Address } from './Address';
import { Person } from './Person';
import { Company } from './Company';

export class Contact {
  id: number;
  name: string;
  email: string;
  phone: number;
  otherInfo: string;
  howFind: string;
  type: string;
  person: Person;
  company: Company;
  address: Address[];

  constructor(
    id: number,
    name: string,
    email: string,
    phone: number,
    otherInfo: string,
    howFind: string,
    type: string,
    company: Company,
    person: Person
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.otherInfo = otherInfo;
    this.howFind = howFind;
    this.type = type;
    this.company = company;
    this.person = person;
    this.address = [];
  }
}
