import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { ProductGuard } from './core/guards/product.guard';
import { ChangePasswordComponent } from './core/pages/auth/change-password/change-password.component';
import { LoginComponent } from './core/pages/auth/login/login.component';
import { RegisterComponent } from './core/pages/auth/register/register.component';
import { SendEmailComponent } from './core/pages/auth/send-email/send-email.component';
import { IndexComponent } from './core/pages/index/index.component';
import { DetailProductComponent } from './core/pages/product/detail-product/detail-product.component';
import { EditProductComponent } from './core/pages/product/edit-product/edit-product.component';
import { ListProductComponent } from './core/pages/product/list-product/list-product.component';
import { NewProductComponent } from './core/pages/product/new-product/new-product.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  {
    path: 'sendemail',
    component: SendEmailComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'change-password/:token-password',
    component: ChangePasswordComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'list',
    component: ListProductComponent,
    canActivate: [ProductGuard],
    data: { expectedRole: ['admin', 'user'] },
  },
  {
    path: 'detail/:id',
    component: DetailProductComponent,
    canActivate: [ProductGuard],
    data: { expectedRole: ['admin', 'user'] },
  },
  {
    path: 'new',
    component: NewProductComponent,
    canActivate: [ProductGuard],
    data: { expectedRole: ['admin'] },
  },
  {
    path: 'edit/:id',
    component: EditProductComponent,
    canActivate: [ProductGuard],
    data: { expectedRole: ['admin'] },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
