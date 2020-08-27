export class ContactSearchValues {
  pageNumber = 0; // 1 page default
  pageSize = 5; // number of elements on page

  name: string = '';
  type: string = '';
  email: string = '';
  phone: string = '';

  // sorting
  sortColumn = 'name';
  sortDirection = 'desc';
}
