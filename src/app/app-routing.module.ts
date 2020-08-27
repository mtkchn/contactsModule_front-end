import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactsComponent } from './views/contacts/contacts.component';
import { AddContactComponent } from './views/add-contact/add-contact.component';
import { ContactComponent } from './views/contact/contact.component';
import { EditContactComponent } from './views/edit-contact/edit-contact.component';
import { AddEmployeeComponent } from './dialog/add-employee/add-employee.component';

const routes: Routes = [
  { path: '', component: ContactsComponent },
  { path: 'add', component: AddContactComponent },
  { path: 'edit/:id', component: EditContactComponent },

  { path: 'contact/:id', component: ContactComponent },
  { path: 'addEmployee', component: AddEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
