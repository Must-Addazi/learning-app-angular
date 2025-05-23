import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { PaymentComponent } from './payment/payment.component';
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
import { EditPaymentComponent } from './edit-payment/edit-payment.component';
import { NewModuleComponent } from './new-module/new-module.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MeetingComponent } from './meeting/meeting.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"forgot-password",component:ForgotPasswordComponent},
  {path:"reset-password",component:ResetPasswordComponent},
  {path:"",component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"admin",component:AdminTemplateComponent,children:[
  {path:"profile",component:ProfileComponent,canActivate:[authenticationGuard]},
  {path:"profile/:code",component:ProfileComponent,canActivate:[authenticationGuard]},
  {path:"program",component:ProgramsComponent},
  {path:"edit-program/:code",component:LoadStudentsComponent,canActivate:[authenticationGuard,authorizationGuard],data:{roles:['ROLE_ADMIN']}},
  {path:"respo",component:RespoComponent,canActivate:[authenticationGuard,authorizationGuard],data:{roles:['ROLE_ADMIN']}},
  {path:"new-payment/:code",component:NewPaymentComponent,canActivate:[authenticationGuard]},
  {path:"dashboard",component:DashboardComponent},
  {path:"students",component:StudentsComponent,canActivate:[authenticationGuard,authorizationGuard],data:{roles:['ROLE_ADMIN']}},
  {path:"new-student",component:NewStudentComponent},
  {path:"payment",component:PaymentComponent,canActivate:[authenticationGuard]},
  {path:"payment/:code",component:PaymentComponent,canActivate:[authenticationGuard]},
  {path:"module",component:ModuleComponent},
  {path:"meet",component:MeetingComponent},
  {path:"new-module/:programId",component:NewModuleComponent,canActivate:[authenticationGuard,authorizationGuard],data:{roles:['ROLE_ADMIN']}},
  {path:"edit-module/:moduleId",component:NewModuleComponent,canActivate:[authenticationGuard,authorizationGuard],data:{roles:['ROLE_ADMIN']}},
  {path:"edit-password",component:EditPasswordComponent,canActivate:[authenticationGuard,authorizationGuard],data:{roles:['ROLE_ADMIN']}},
  {path:"student-select",component:StudentDetailsComponent,canActivate:[authenticationGuard,authorizationGuard],data:{roles:['ROLE_ADMIN']}},
  {path:"editpayement/:id",component:EditPaymentComponent, canActivate:[authenticationGuard,authorizationGuard],data:{roles:['ROLE_ADMIN']}},
  {path:"loadstudents",component:LoadStudentsComponent,canActivate:[authenticationGuard,authorizationGuard],data:{roles:['ADMIN']}
  }
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
