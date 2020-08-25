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
import { Emploee } from 'src/app/models/Emploee';

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
  dataSource: MatTableDataSource<Emploee> = new MatTableDataSource<Emploee>();
  totalContactsFounded: number;
  contactSearchValues = new ContactSearchValues();
  // -------------------------------------------------------------------------

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.searchContacts(this.contactSearchValues);
  }

  type(data) {
    return data.company === null ? 'Osoba fizyczna' : 'Firma';
  }

  deleteContact(contact: Contact) {
    this.contactService.delete(contact.id).subscribe((cat) => {
      this.searchContacts(this.contactSearchValues); // обновляем список категорий
    });
  }

  searchContacts(contactSearchValues: ContactSearchValues) {
    this.contactSearchValues = contactSearchValues;

    this.contactService
      .findContacts(this.contactSearchValues)
      .subscribe((result) => {
        this.totalContactsFounded = result.totalElements; // сколько данных показывать на странице
        this.contacts = result.content; // массив задач
        this.dataSource.data = result.content;
      });
  }

  paging(pageEvent: PageEvent): void {
    // если изменили настройку "кол-во на странице" - заново делаем запрос и показываем с 1й страницы
    if (this.contactSearchValues.pageSize !== pageEvent.pageSize) {
      this.contactSearchValues.pageNumber = 0; // новые данные будем показывать с 1-й страницы (индекс 0)
    } else {
      // если просто перешли на другую страницу
      this.contactSearchValues.pageNumber = pageEvent.pageIndex;
    }

    this.contactSearchValues.pageSize = pageEvent.pageSize;
    this.contactSearchValues.pageNumber = pageEvent.pageIndex;

    this.searchContacts(this.contactSearchValues); // показываем новые данные
  }
}
