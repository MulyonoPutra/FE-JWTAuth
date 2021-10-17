import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordService } from 'src/app/core/services/forgot-password.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ChangePassword } from './../../../models/change-password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  password!: string;
  confirmPassword!: string;
  tokenPassword!: string;

  dto!: ChangePassword;

  constructor(
    private emailPasswordService: ForgotPasswordService,
    private toast: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onChangePassword(): void {
    if (this.password !== this.confirmPassword) {
      this.toast.incorrect();
      return;
    }
    this.tokenPassword = this.activatedRoute.snapshot.params.tokenPassword;
    this.dto = new ChangePassword(
      this.password,
      this.confirmPassword,
      this.tokenPassword
    );
    this.emailPasswordService.changePassword(this.dto).subscribe(
      (data) => {
        this.toast.success(data);
        this.router.navigate(['/login']);
      },
      (err) => {
        this.toast.failed(err);
        console.log(err);
      }
    );
  }
}
