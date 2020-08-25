interface SelectValues {
  value: string;
  viewValue: string;
}

export class SelectOptions {
  media: SelectValues[] = [
    { value: 'facebook', viewValue: 'Facebook' },
    { value: 'twitter', viewValue: 'Twitter' },
    { value: 'linkedin', viewValue: 'LinkedIn' },
    { value: 'instagram', viewValue: 'Instagram' },
    { value: 'inne', viewValue: 'Inne' },
  ];

  ways: SelectValues[] = [
    { value: 'reference', viewValue: 'Rekomendacja' },
    { value: 'conference', viewValue: 'Konferencja i szkolenie' },
    { value: 'media', viewValue: 'Media społecznościowe' },
    { value: 'page', viewValue: 'Strona www' },
  ];

  getWays(): SelectValues[] {
    return this.ways;
  }

  legalForm: SelectValues[] = [
    { value: 'sp_akc', viewValue: 'Spółka akcyjna' },
    { value: 'sp_cywilna', viewValue: 'Spółka cywilna' },
    { value: 'sp_prawna', viewValue: 'Spółka prawna' },
    { value: 'spzoo', viewValue: 'Spółka z o.o.' },
    { value: 'inne', viewValue: 'inne' },
  ];
}
