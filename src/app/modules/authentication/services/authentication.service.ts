import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators/map';
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME: string = 'jwt_token';

@Injectable()
export class AuthenticationService {

    authBackendUri: string;

    constructor(private http: HttpClient) {
        this.authBackendUri = 'http://localhost:8085/user';
    }

    registerUser(user: User) {
        let endpoint = `${this.authBackendUri}/register`;
        return this.http.post(endpoint, user).pipe(
            catchError(this.handleError)
        );
    }

    authenticateUser(user: User) {
        let endpoint = `${this.authBackendUri}/login`;
        return this.http.post(endpoint, user).pipe(
            catchError(this.handleError)
        );
    }

    setAuthToken(token: string) {
        localStorage.setItem(TOKEN_NAME, token);
    }

    getAuthToken() {
        return localStorage.getItem(TOKEN_NAME);
    }

    removeAuthToken() {
        localStorage.removeItem(TOKEN_NAME);
    }

    isAuthTokenExpired() {
        let token = this.getAuthToken();
        if (!token) {
            return true;
        }
        const date = this.getAuthTokenExpirationDate(token);
        if (date == undefined || date == null) {
            return false;
        }
        return !(date.valueOf() > new Date().valueOf());
    }

    getAuthTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);
        if (decoded.exp === undefined) {
            return null;
        }
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    handleError(error) {
        let errorMessage = '';
        if (error.error != null) {
            if (error.error.message == undefined) {
                error.error = JSON.parse(error.error)
                errorMessage = `${error.error.message}`;
            } else {
                errorMessage = `${error.error.message}`;
            }
        } else {
            errorMessage = `${error.message}`;
        }
        return Observable.throw(errorMessage);
    }
}
