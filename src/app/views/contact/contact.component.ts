import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/models/Contact';
import { ContactService } from 'src/app/dao/impl/contact.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddEmployeeComponent } from 'src/app/dialog/add-employee/add-employee.component';
import { Employee } from 'src/app/models/Employee';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeStatusComponent } from 'src/app/dialog/change-status/change-status.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  public contact: Contact;
  contactId: Number;

  displayedColumns: string[] = [
    'employeeName',
    'employeeSurname',
    'employeePosition',
    'employeeStatus',

    'employeePhone',
    'operations',
  ];
  dataSource: MatTableDataSource<Contact> = new MatTableDataSource<Contact>();

  constructor(
    private contactService: ContactService,
    private router: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getContact(this.router.snapshot.params.id);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '250px',
      data: new Employee(null, '', '', '', '', null),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.addEmployee(result);
    });
  }

  editDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '250px',
      data: new Employee(
        employee.employeeId,
        employee.employeeName,
        employee.employeeSurname,
        employee.employeePosition,
        employee.employeePhone,
        employee.employeeStatus
      ),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.updateEmployee(result);
    });
  }

  changeStatus(element: Employee) {
    const dialogRef = this.dialog.open(ChangeStatusComponent, {
      width: '250px',
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.updateEmployee(result);
    });
  }

  deleteContact(data: Employee) {
    this.contactService.deleteEmployee(data.employeeId).subscribe((cat) => {
      this.getContact(this.router.snapshot.params.id);
    });
  }

  updateEmployee(employee: Employee): void {
    this.contactService.updateEmployee(employee).subscribe((result) => {
      this.getContact(this.router.snapshot.params.id);
    });
  }

  addEmployee(employee: Employee): void {
    this.contact.company.employee.push(employee);
    this.contactService.update(this.contact).subscribe((result) => {
      this.getContact(this.router.snapshot.params.id);
    });
  }

  getContact(id: number) {
    this.contactService.findById(id).subscribe((result) => {
      this.contact = result;
      if (result.company !== null) {
        this.dataSource = result.company.employee;
      }
    });
  }
}
