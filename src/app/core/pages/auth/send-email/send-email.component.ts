import { Component, OnInit } from '@angular/core';
import { ForgotPasswordService } from 'src/app/core/services/forgot-password.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { EmailValues } from './../../../models/email-values';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
})
export class SendEmailComponent implements OnInit {
  mailTo!: string;
  dto!: EmailValues;

  constructor(
    private emailPasswordService: ForgotPasswordService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {}

  onSendEmail(): void {
    this.dto = new EmailValues(this.mailTo);
    this.emailPasswordService.sendEmail(this.dto).subscribe(
      (data) => {
        this.toast.success(data);
      },
      (error) => {
        this.toast.failed(error);
      }
    );
  }
}
