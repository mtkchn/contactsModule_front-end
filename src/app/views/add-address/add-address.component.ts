import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Address } from '../../models/Address';
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css'],
})
export class AddAddressComponent implements OnInit {
  @Input()
  public addresses: FormArray;
  address;
  addressForEdit;
  editBtn = false;
  editedId: number;
  public myModel = '';
  public mask = [/[0-9]/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(private fb: FormBuilder) {
    this.addressInit();
  }

  addAddress(form) {
    this.addresses.push(new FormControl(form.value));
    this.addressInit();
    form.resetForm();
  }

  edit(form) {
    this.addresses.value[this.editedId] = form.value;
    this.editBtn = false;
    this.addressInit();
    form.resetForm();
  }

  ngOnInit(): void {}

  addressInit(): void {
    this.address = this.fb.group({
      addressType: [
        null,
        [Validators.required, Validators.pattern('[a-zA-Z ]*')],
      ],
      addressStreet: [null, [Validators.required]],
      addressHome: [null, [Validators.required]],
      addressApartment: [null],
      addressPostalCode: [null, [Validators.required]],
      addressCity: [
        null,
        [Validators.required, Validators.pattern('[a-zA-Z ]*')],
      ],
    });
  }

  editAddress(event) {
    this.editBtn = true;
    this.editedId = event;
    this.address.setValue({
      addressType: this.addresses.value[event].addressType,
      addressStreet: this.addresses.value[event].addressStreet,
      addressHome: this.addresses.value[event].addressHome,
      addressApartment: this.addresses.value[event].addressApartment,
      addressPostalCode: this.addresses.value[event].addressPostalCode,
      addressCity: this.addresses.value[event].addressCity,
    });
  }
}
