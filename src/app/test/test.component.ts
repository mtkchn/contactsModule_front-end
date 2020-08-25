import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/Contact';
import { ContactService } from 'src/app/dao/impl/contact.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import {
  peselValidator,
  validateNip,
  validateRegon,
  validateKrs,
} from 'src/app/validators/validators';
import { Person } from 'src/app/models/Person';
import { Company } from 'src/app/models/Company';

interface SelectOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
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
    private router: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getContact(this.router.snapshot.params.id);
  }

  contactFormInit(data): void {
    this.contactForm = this.fb.group({
      name: [null, [(Validators.required, Validators.pattern('[a-zA-Z ]*'))]],

      email: [null],
      phone: [null],
      otherInfo: [null],
      howFind: [null],
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
          data.person.surname,
          [Validators.required, Validators.pattern('[a-zA-Z ]*')],
        ],
        pesel: [data.person.pesel, [Validators.required]],
      })
    );

    this.contactForm.setValue({
      name: data.name,
      person: {
        surname: data.person.surname,
        pesel: data.person.pesel,
      },
      email: data.email,
      phone: data.phone,
      otherInfo: data.otherInfo,
      howFind: data.howFind,
      address: [],
    });
  }

  companyInit(data) {
    this.contactForm.addControl(
      'company',
      this.fb.group({
        nip: [null, [Validators.required]],
        regon: [null, [Validators.required]],
        krs: [null, [Validators.required]],
        legalForm: [null],
      })
    );

    this.contactForm.setValue({
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
      address: [],
    });

    if (data.company.otherLegalForm) {
      console.log('otherLegal', data.company.otherLegalForm);
      (this.contactForm.get('company') as FormGroup).addControl(
        'otherLegalForm',
        new FormControl(data.company.otherLegalForm)
      );
    }
  }

  getContact(id: number): void {
    console.log('GETTING CONTACT...');

    this.contactService.findById(id).subscribe((result) => {
      this.contact = result;
      this.contactFormInit(result);

      console.log('GET RESULT ::: ', this.contact);
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

      console.log('CONTACT BY ID :::', this.contact);

      if (result.recommender) {
        console.log('recommender', result.recommender);
        this.contactForm.addControl(
          'recommender',
          new FormControl(result.recommender)
        );
      } else if (result.conference) {
        console.log('conference', result.conference);
        this.contactForm.addControl(
          'conference',
          new FormControl(result.conference)
        );
      } else if (result.media) {
        console.log('recommender', result.media);
        this.contactForm.addControl('media', new FormControl(result.media));
      }
    });
  }

  selectedWay(option, form): void {
    const way: string = option.value;
    console.log('option :::: ', option);

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

  inneMedia(option, form): void {
    const media: string = option.value;
    if (media === 'inne') {
      form.addControl('inneMedia', new FormControl());
    } else if (form.controls.hasOwnProperty('inneMedia')) {
      form.removeControl('inneMedia');
    }
  }
}
