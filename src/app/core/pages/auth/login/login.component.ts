import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/core/models/login';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login!: Login;
  username!: string;
  password!: string;

  errorMessage!: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.login = new Login(this.username, this.password);
    this.authService.login(this.login).subscribe(
      (data) => {
        this.tokenService.setToken(data.token);
        this.router.navigate(['/']);
      },
      (err) => {
        this.errorMessage = err.error.message;
         this.toast.failed(err);
      }
    );
  }
}
