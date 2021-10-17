import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  errorMessage: any;

  constructor(private toastr: ToastrService) {}

  public success(data: any) {
    this.toastr.success('Account Created', 'OK', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
  }

  public failed(err: any) {
    this.errorMessage = err.error.message;
    this.toastr.error(this.errorMessage!, 'Failed', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
  }

  public incorrect() {
    this.toastr.success('Password do not match!', 'Failed', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
  }
}
