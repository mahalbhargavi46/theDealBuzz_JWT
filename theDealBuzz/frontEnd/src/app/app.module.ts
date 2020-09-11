import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './user.service';
import { ProductService } from './product.service';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { AuthInterceptor } from './auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductListComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatCardModule
  ],
  providers: [UserService,ProductService,{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
