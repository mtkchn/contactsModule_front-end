export class Emploee {
  employeeId: number;
  employeeName: string;
  employeeSurname: string;
  employeePosition: string;
  employeePhone: string;
  employeeStatus: boolean;

  constructor(
    employeeId: number,
    employeeName: string,
    employeeSurname: string,
    employeePosition: string,
    employeePhone: string,
    employeeStatus: boolean
  ) {
    this.employeeId = employeeId;
    this.employeeName = employeeName;
    this.employeeSurname = employeeSurname;
    this.employeePosition = employeePosition;
    this.employeePhone = employeePhone;
    this.employeeStatus = employeeStatus;
  }
}
