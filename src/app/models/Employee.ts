export class Employee {
  employeeId: number;
  employeeName: string;
  employeeSurname: string;
  employeePosition: string;
  employeePhone: string;
  employeeStatus: number;

  constructor(
    employeeId: number,
    employeeName: string,
    employeeSurname: string,
    employeePosition: string,
    employeePhone: string,
    employeeStatus: number
  ) {
    this.employeeId = employeeId;
    this.employeeName = employeeName;
    this.employeeSurname = employeeSurname;
    this.employeePosition = employeePosition;
    this.employeePhone = employeePhone;
    this.employeeStatus = employeeStatus;
  }
}
