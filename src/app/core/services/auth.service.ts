import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from './../models/register';
import { Login } from './../models/login';
import { JSONWebTokens } from '../models/json-web-tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authURL = environment.authURL;

  constructor(private httpClient: HttpClient) {}

  public register(register: Register): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'register', register);
  }

  public login(login: Login): Observable<JSONWebTokens> {
    return this.httpClient.post<JSONWebTokens>(this.authURL + 'login', login);
  }

  public refresh(tokens: JSONWebTokens): Observable<JSONWebTokens> {
    return this.httpClient.post<JSONWebTokens>(
      this.authURL + 'refresh',
      tokens
    );
  }
}
