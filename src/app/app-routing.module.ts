import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { PaymentComponent } from './payment/payment.component';
import { LoadPayementComponent } from './load-payement/load-payement.component';
import { LoadStudentsComponent } from './load-students/load-students.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { authenticationGuard } from './gaurds/authentication.guard';
import { authorizationGuard } from './gaurds/authorization.guard';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { NewStudentComponent } from './new-student/new-student.component';
import { ProgramsComponent } from './programs/programs.component';
import { RespoComponent } from './respo/respo.component';
import { ModuleComponent } from './module/module.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:'admin',component:AdminTemplateComponent,canActivate:[authenticationGuard],children:[
  {path:"home",component:HomeComponent},
  {path:"profile",component:ProfileComponent},
  {path:"new-student",component:NewStudentComponent} ,
  {path:"program",component:ProgramsComponent},
  {path:"respo",component:RespoComponent},
  {path:"new-payment/:code",component:NewPaymentComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"students",component:StudentsComponent},
  {path:"payment",component:PaymentComponent},
  {path:"module",component:ModuleComponent},
  {path:"student-details/:code",component:StudentDetailsComponent},
  {path:"loadpayement",component:LoadPayementComponent,
    canActivate:[authorizationGuard],data:{roles:['ADMIN']}},
  {path:"loadstudents",component:LoadStudentsComponent,
    canActivate:[authorizationGuard],data:{roles:['ADMIN']}
  }
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
