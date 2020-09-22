import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/Contact';
import { ContactService } from 'src/app/dao/impl/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import {
  krsValidator,
  nipValidator,
  peselValidator,
  phoneValidator,
  regonValidator,
} from 'src/app/validators/validators';
import { Person } from 'src/app/models/Person';
import { Company } from 'src/app/models/Company';

interface SelectOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  public contact: Contact;
  contactForm: FormGroup;

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
    private contactService: ContactService,
    private router: Router,

    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getContact(this.route.snapshot.params.id);
  }

  editContact() {
    this.contactService.update(this.contactForm.value).subscribe((result) => {
      this.router.navigate(['']);
    });
  }
  contactFormInit(data): void {
    this.contactForm = this.fb.group({
      id: [null],
      name: [
        null,
        [Validators.required, Validators.pattern('[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]*')],
      ],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, phoneValidator]],
      otherInfo: [null],
      howFind: [null],
      type: [null],
      address: new FormArray([]),
    });
  }

  selectedLegalForm(option, form): void {
    const legalForm: string = option.value;
    if (legalForm === 'inne') {
      form.addControl('otherLegalForm', new FormControl());
    } else if (form.controls.hasOwnProperty('otherLegalForm')) {
      form.removeControl('otherLegalForm');
    }
  }

  personInit(data) {
    this.contactForm.addControl(
      'person',
      this.fb.group({
        surname: [
          null,
          [
            Validators.required,
            Validators.pattern('[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]*'),
          ],
        ],
        pesel: [null, [Validators.required, peselValidator]],
      })
    );

    this.contactForm.setValue({
      id: data.id,
      name: data.name,
      person: {
        surname: data.person.surname,
        pesel: data.person.pesel,
      },
      email: data.email,
      phone: data.phone,
      otherInfo: data.otherInfo,
      howFind: data.howFind,
      type: data.type,
      address: [],
    });
  }

  companyInit(data) {
    this.contactForm.addControl(
      'company',
      this.fb.group({
        nip: [null, [Validators.required, nipValidator]],
        regon: [null, [Validators.required, regonValidator]],
        krs: [null, [Validators.required, krsValidator]],
        legalForm: [null, [Validators.required]],
      })
    );

    this.contactForm.setValue({
      id: data.id,
      name: data.name,
      company: {
        nip: data.company.nip,
        regon: data.company.regon,
        krs: data.company.krs,
        legalForm: data.company.legalForm,
      },
      email: data.email,
      phone: data.phone,
      otherInfo: data.otherInfo,
      howFind: data.howFind,
      type: data.type,
      address: [],
    });

    if (data.company.otherLegalForm) {
      (this.contactForm.get('company') as FormGroup).addControl(
        'otherLegalForm',
        new FormControl(data.company.otherLegalForm)
      );
    }
  }

  getContact(id: number): void {
    this.contactService.findById(id).subscribe((result) => {
      this.contact = result;
      this.contactFormInit(result);

      if (result.company === null) {
        this.personInit(result);
      } else {
        this.companyInit(result);
      }
      result.address.forEach((element) => {
        (this.contactForm.get('address') as FormArray).push(
          new FormControl(element)
        );
      });

      if (result.recommender) {
        this.contactForm.addControl(
          'recommender',
          new FormControl(result.recommender)
        );
      } else if (result.conference) {
        this.contactForm.addControl(
          'conference',
          new FormControl(result.conference)
        );
      } else if (result.media) {
        this.contactForm.addControl('media', new FormControl(result.media));
      }
    });
  }

  selectedWay(option, form): void {
    const way: string = option.value;

    form.removeControl('inneMedia');

    switch (true) {
      case form.controls.hasOwnProperty('recommender'):
        form.removeControl('recommender');
        break;
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
  getErrorMessage(errorField: string) {
    if (this.contactForm.get(errorField).hasError('required')) {
      return 'Pole nie może być puste';
    }

    if (this.contactForm.get(errorField).hasError('peselError')) {
      return 'Niepoprawny nr. pesel';
    }

    if (this.contactForm.get(errorField).hasError('email')) {
      return 'Niepoprawny adres email';
    }

    if (this.contactForm.get(errorField).hasError('phoneError')) {
      return 'Niepoprawny nr. telefonu';
    }

    if (this.contactForm.get(errorField).hasError('regonError')) {
      return 'Niepoprawny nr. regon';
    }

    if (this.contactForm.get(errorField).hasError('nipError')) {
      return 'Niepoprawny nr. nip';
    }

    if (this.contactForm.get(errorField).hasError('krsError')) {
      return 'Niepoprawny nr. krs';
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
}
