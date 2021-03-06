import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidationErrors,
  FormArray,
} from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { concat } from 'rxjs';
import { ContactService } from 'src/app/dao/impl/contact.service';
import { Address } from 'src/app/models/Address';
import { Person } from 'src/app/models/Person';
import { Company } from 'src/app/models/Company';
import {
  peselValidator,
  regonValidator,
  nipValidator,
  krsValidator,
  phoneValidator,
} from '../../validators/validators';
import { Router } from '@angular/router';

interface SelectOptions {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  newPerson: FormGroup;
  newCompany: FormGroup;
  addresses: FormGroup;

  contactType: boolean;
  stap1: boolean;
  innemedia;

  media: SelectOptions[] = [
    { value: 'facebook', viewValue: 'Facebook' },
    { value: 'twitter', viewValue: 'Twitter' },
    { value: 'linkedin', viewValue: 'LinkedIn' },
    { value: 'instagram', viewValue: 'Instagram' },
    { value: 'inne', viewValue: 'Inne' },
  ];

  ways: SelectOptions[] = [
    { value: 'reference', viewValue: 'Rekomendacja' },
    { value: 'conference', viewValue: 'Konferencja i szkolenie' },
    { value: 'media', viewValue: 'Media społecznościowe' },
    { value: 'page', viewValue: 'Strona www' },
  ];

  legalForm: SelectOptions[] = [
    { value: 'sp_akc', viewValue: 'Spółka akcyjna' },
    { value: 'sp_cywilna', viewValue: 'Spółka cywilna' },
    { value: 'sp_prawna', viewValue: 'Spółka prawna' },
    { value: 'spzoo', viewValue: 'Spółka z o.o.' },
    { value: 'inne', viewValue: 'inne' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private contactService: ContactService
  ) {
    this.contactType = true;
  }

  typeControll(): FormGroup {
    if (this.contactType) {
      return this.newPerson;
    } else {
      return this.newCompany;
    }
  }

  personFormInit(): void {
    this.newPerson = this.fb.group({
      name: [
        null,
        [Validators.required, Validators.pattern('[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]*')],
      ],
      person: this.fb.group({
        surname: [
          null,
          [
            Validators.required,
            Validators.pattern('[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]*'),
          ],
        ],
        pesel: [null, [Validators.required, peselValidator]],
      }),
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, phoneValidator]],
      otherInfo: [null],
      howFind: [null],
      type: ['person'],
      address: new FormArray([]),
    });
  }

  companyFormInit(): void {
    this.newCompany = this.fb.group({
      name: [
        null,
        [
          Validators.required,
          Validators.pattern('[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ0-9 ]*'),
        ],
      ],
      company: this.fb.group({
        nip: [null, [Validators.required, nipValidator]],
        regon: [null, [Validators.required, regonValidator]],
        krs: [null, [Validators.required, krsValidator]],
        legalForm: [null, [Validators.required]],
      }),
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, phoneValidator]],
      otherInfo: [null],
      howFind: [null],
      type: ['company'],
      answer: [null],
      address: new FormArray([]),
    });
  }

  selectedLegalForm(option, form): void {
    const legalForm: string = option.value;
    if (legalForm === 'inne') {
      form.addControl(
        'otherLegalForm',
        new FormControl(null, Validators.required)
      );
    } else if (form.controls.hasOwnProperty('otherLegalForm')) {
      form.removeControl('otherLegalForm');
    }
  }

  selectedWay(option, form): void {
    const way: string = option.value;
    form.removeControl('inneMedia');

    switch (true) {
      case form.controls.hasOwnProperty('recommender'):
        form.removeControl('recommender');
        break;

      case form.controls.hasOwnProperty('conference'):
        form.removeControl('conference');
        break;
      case form.controls.hasOwnProperty('media'):
        form.removeControl('media');
        break;
    }

    switch (way) {
      case 'reference':
        form.addControl('recommender', new FormControl());
        break;
      case 'conference':
        form.addControl('conference', new FormControl());
        break;
      case 'media':
        form.addControl('media', new FormControl());
        break;
    }
  }

  inneMedia(option, form): void {
    const media: string = option.value;
    if (media === 'inne') {
      form.addControl('inneMedia', new FormControl());
    } else if (form.controls.hasOwnProperty('inneMedia')) {
      form.removeControl('inneMedia');
    }
  }

  addContact(contact: Person | Company): void {
    this.contactService.add(contact).subscribe((result) => {
      this.router.navigate(['']);
    });
  }

  getErrorMessage(errorField: string) {
    if (this.typeControll().get(errorField).hasError('required')) {
      return 'Pole nie może być puste';
    }

    if (this.typeControll().get(errorField).hasError('peselError')) {
      return 'Niepoprawny nr. pesel';
    }

    if (this.typeControll().get(errorField).hasError('email')) {
      return 'Niepoprawny adres email';
    }

    if (this.typeControll().get(errorField).hasError('phoneError')) {
      return 'Niepoprawny nr. telefonu';
    }

    if (this.typeControll().get(errorField).hasError('regonError')) {
      return 'Niepoprawny nr. regon';
    }

    if (this.typeControll().get(errorField).hasError('nipError')) {
      return 'Niepoprawny nr. nip';
    }

    if (this.typeControll().get(errorField).hasError('krsError')) {
      return 'Niepoprawny nr. krs';
    }
  }

  ngOnInit() {
    this.personFormInit();
    this.companyFormInit();
    this.typeControll();
  }
}
