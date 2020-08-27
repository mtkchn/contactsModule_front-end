import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactsComponent } from './views/contacts/contacts.component';
import { HttpClientModule } from '@angular/common/http';
import { CONTACT_URL_TOKEN } from './dao/impl/contact.service';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TestComponent } from './test/test.component';
import { AddContactComponent } from './views/add-contact/add-contact.component';
import { AddAddressComponent } from './views/add-address/add-address.component';
import { TextMaskModule } from 'angular2-text-mask';
import { AddresListComponent } from './views/addres-list/addres-list.component';
import { ContactComponent } from './views/contact/contact.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EditContactComponent } from './views/edit-contact/edit-contact.component';
import { AddEmployeeComponent } from './dialog/add-employee/add-employee.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangeStatusComponent } from './dialog/change-status/change-status.component';
@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    TestComponent,
    AddContactComponent,
    AddAddressComponent,
    AddresListComponent,
    ContactComponent,
    EditContactComponent,
    AddEmployeeComponent,
    ChangeStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
    MatSelectModule,
    TextMaskModule,
    MatTabsModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: CONTACT_URL_TOKEN,
      useValue: 'http://localhost:8080',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
