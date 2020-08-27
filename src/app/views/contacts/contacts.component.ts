import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Contact } from 'src/app/models/Contact';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ContactService } from 'src/app/dao/impl/contact.service';
import { ContactSearchValues } from 'src/app/dao/search/SearchObjects';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  // -------------------------------------------------------------------------
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  contacts: Contact[];
  displayedColumns: string[] = ['name', 'type', 'email', 'phone', 'operations'];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  totalContactsFounded: number;
  contactSearchValues = new ContactSearchValues();

  filterName: string = '';
  filterType: string = '';
  filterEmail: string = '';
  filterPhone: string = '';
  filterSortColumn: string = '';
  filterSortDirection: string = '';

  // -------------------------------------------------------------------------

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.searchContacts();
  }

  type(data) {
    return data.company === null ? 'Osoba fizyczna' : 'Firma';
  }

  deleteContact(contact: Contact) {
    this.contactService.delete(contact.id).subscribe((cat) => {
      this.searchContacts();
    });
  }

  searchContacts() {
    this.contactService
      .testSearch(this.contactSearchValues)
      .subscribe((result) => {
        console.log('result : ', result);
        if (
          result.totalPages > 0 &&
          this.contactSearchValues.pageNumber >= result.totalPages
        ) {
          this.contactSearchValues.pageNumber = 0;
          this.searchContacts();
        }
        this.totalContactsFounded = result.totalElements;
        this.contacts = result.content;
        this.dataSource.data = result.content;
      });
  }

  selectedType(option) {
    console.log;
    if (option.value === 'person') {
      this.filterType = 'person';
    } else if (option.value === 'company') {
      this.filterType = 'company';
    }
    this.initSearch();
  }

  clearSearchValues() {
    this.filterName = '';
    this.filterType = '';
    this.filterEmail = '';
    this.filterPhone = '';
    this.initSearch();
  }
  initSearch() {
    console.log('start');
    this.contactSearchValues.name = this.filterName;
    this.contactSearchValues.type = this.filterType;
    this.contactSearchValues.email = this.filterEmail;
    this.contactSearchValues.phone = this.filterPhone;

    this.contactSearchValues.sortDirection = this.filterSortDirection;

    this.searchContacts();
  }

  // изменили направление сортировки
  changedSortDirection() {
    if (this.filterSortDirection === 'asc') {
      this.filterSortDirection = 'desc';
    } else {
      this.filterSortDirection = 'asc';
    }
    this.initSearch();
  }

  paging(pageEvent: PageEvent): void {
    if (this.contactSearchValues.pageSize !== pageEvent.pageSize) {
      this.contactSearchValues.pageNumber = 0;
    } else {
      this.contactSearchValues.pageNumber = pageEvent.pageIndex;
    }
    this.contactSearchValues.pageSize = pageEvent.pageSize;
    this.contactSearchValues.pageNumber = pageEvent.pageIndex;

    this.searchContacts();
  }
}
