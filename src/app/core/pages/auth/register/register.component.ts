import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Register } from './../../../models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  register!: Register;
  name!: string;
  username!: string;
  email!: string;
  password!: string;
  errorMessage!: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {}

  onRegister(): void {
    this.register = new Register(
      this.name!,
      this.username!,
      this.email,
      this.password
    );
    this.authService.register(this.register).subscribe(
      (data) => {
        this.toast.success(data);

        this.router.navigate(['/login']);
      },
      (error) => {
        this.toast.failed(error);
      }
    );
  }

}
