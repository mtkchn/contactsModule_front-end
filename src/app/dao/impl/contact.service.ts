import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Contact } from 'src/app/models/Contact';
import { ContactDAO } from '../interface/ContactDAO';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { ContactSearchValues } from '../search/SearchObjects';
import { from, Observable } from 'rxjs';
import { Employee } from 'src/app/models/Employee';

export const CONTACT_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root',
})
export class ContactService extends CommonService<any> implements ContactDAO {
  constructor(
    @Inject(CONTACT_URL_TOKEN) private baseUrl,
    private http: HttpClient
  ) {
    super(baseUrl + '/contact', http);
  }

  findContacts(contactSearchValues: ContactSearchValues): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/contact', contactSearchValues);
  }

  searchContacts(contactSearchValues: ContactSearchValues): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/search', contactSearchValues);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/employee/delete/' + id);
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put<Employee>(
      this.baseUrl + '/employee/update/',
      employee
    );
  }
}
