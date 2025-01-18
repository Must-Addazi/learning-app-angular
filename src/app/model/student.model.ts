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
    icon: any
    cin: string
    id: string
    birthDate:Date
    firstName: string
    lastName: string
    email: string
    amountPaid: number
    photo: any
    phone:string
    noteBac:number
    noteDiploma:number
    bacFile: string
    diplomaFile: string
    photoCIN:string
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