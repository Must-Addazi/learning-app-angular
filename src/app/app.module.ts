import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import {MatToolbarModule} from "@angular/material/toolbar"
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { PaymentComponent } from './payment/payment.component';
import { MatCardModule } from '@angular/material/card';
import { LoadStudentsComponent } from './load-students/load-students.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { appHttpInterceptor } from './interceptor/app-http.interceptor';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NewStudentComponent } from './new-student/new-student.component';
import { ProgramsComponent } from './programs/programs.component';
import { MatStepperModule} from '@angular/material/stepper';
import { AsyncPipe } from '@angular/common';
import { RespoComponent } from './respo/respo.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ModuleComponent } from './module/module.component';
import { ImagePreviewDialogComponent } from './image-preview-dialog/image-preview-dialog.component';
import { DxButtonModule, DxLoadPanelModule, DxScrollViewModule, DxToolbarModule } from 'devextreme-angular';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminTemplateComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    DashboardComponent,
    StudentsComponent,
    PaymentComponent,
    LoadStudentsComponent,
    StudentDetailsComponent,
    NewPaymentComponent,
    NewStudentComponent,
    ProgramsComponent,
    RespoComponent,
    ModuleComponent,
    ImagePreviewDialogComponent,
    EditPaymentComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    PdfViewerModule,
    MatStepperModule,
    FormsModule,
    MatButtonModule,
    AsyncPipe,
    MatProgressBarModule,
    MatDialogModule
        ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([appHttpInterceptor]))
    ],
  bootstrap: [AppComponent]
})
export class AppModule  { }
