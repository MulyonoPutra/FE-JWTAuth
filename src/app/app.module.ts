import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { IndexComponent } from './core/pages/index/index.component';
import { MenuComponent } from './core/pages/menu/menu.component';
import { NewProductComponent } from './core/pages/product/new-product/new-product.component';
import { ListProductComponent } from './core/pages/product/list-product/list-product.component';
import { EditProductComponent } from './core/pages/product/edit-product/edit-product.component';
import { DetailProductComponent } from './core/pages/product/detail-product/detail-product.component';
import { LoginComponent } from './core/pages/auth/login/login.component';
import { RegisterComponent } from './core/pages/auth/register/register.component';
import { ChangePasswordComponent } from './core/pages/auth/change-password/change-password.component';
import { SendEmailComponent } from './core/pages/auth/send-email/send-email.component';
import { interceptorProvider } from './core/helpers/provider';
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    MenuComponent,
    NewProductComponent,
    ListProductComponent,
    EditProductComponent,
    DetailProductComponent,
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    SendEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
