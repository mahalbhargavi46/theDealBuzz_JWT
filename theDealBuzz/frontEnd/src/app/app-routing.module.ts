import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  //whenever the page loads it redirects to the homepage component
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path:'admin', component:AdminComponent},
  {path: 'create-product', component:ProductCreateComponent},
  {path: 'edit-product/:id', component:ProductEditComponent},
  {path:'product-list',component:ProductListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
