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
import { Emploee } from 'src/app/models/Emploee';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  public contact: Contact;
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
      data: new Emploee(null, '', '', '', '', null),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        // если просто закрыли окно, ничего не нажав
        return;
      }
      this.addEmploee(result);
    });
  }

  editDialog(employee: Emploee): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '250px',
      data: new Emploee(
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
    });
  }

  addEmploee(employee: Emploee): void {
    this.contact.company.employee.push(employee);
    this.contactService.update(this.contact).subscribe((result) => {});
  }

  getContact(id: number) {
    this.contactService.findById(id).subscribe((result) => {
      this.contact = result;
      console.log(result);
      if (result.company !== null) {
        this.dataSource = result.company.employee;
      }
    });
  }
}
