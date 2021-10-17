import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmailValues } from './../models/email-values';
import { ChangePassword } from './../models/change-password';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  changePasswordURL = environment.changePasswordURL;

  constructor(private httpClient: HttpClient) {}

  public sendEmail(dto: EmailValues): Observable<any> {
    return this.httpClient.post<any>(
      this.changePasswordURL + 'send-email',
      dto
    );
  }

  public changePassword(dto: ChangePassword): Observable<any> {
    return this.httpClient.post<any>(
      this.changePasswordURL + 'change-password',
      dto
    );
  }
}
