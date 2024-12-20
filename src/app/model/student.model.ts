export interface Payment {
    id: number
    date: string
    amount: number
    type: string
    status: string
    file: any
    studentDTO: Student
  }
  
  export interface Student {
    cin: string
    id: string
    firstName: string
    lastName: string
    email: string
    amountPaid: number
    photo: any
    programDTO: Program
    cne: string
  }
  
  export interface Program{
    id: string
    name: string
    price: number
    poster: any
    responsibleProgramDTO: ResponsibleProgram
  }
  
  export interface ResponsibleProgram{
    id: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    program: Program
  }
  export interface Module{
    id:string
    name:string
   teacherName:string
   programDTO:Program;
  }
  
export enum paymentType{
    CASH,CHECK,TRASFERT,DEPOSIT
}
export enum PaymentStatus{
    CREATED,REJECTED,VALIDATED
}