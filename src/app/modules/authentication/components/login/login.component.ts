import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'user-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: User;

    constructor(private authService: AuthenticationService, private router: Router,
        private snackBar: MatSnackBar) {
        this.user = { userId: '', password: '' };
    }

    ngOnInit() {
        if (this.authService.getAuthToken()) {
            this.router.navigate(['/movies/popular']);
        }
    }

    authenticateUser() {
        this.authService.authenticateUser(this.user).subscribe((data) => {
            if (data["token"]) {
                this.authService.setAuthToken(data['token']);
                this.router.navigate(['/movies/popular']);
            } else {
                let errorMsg = 'Unable to generate Token';
                this.snackBar.open(errorMsg, '', {
                    duration: 4000,
                    panelClass: ['red-snackbar']
                });
            }
        }, (errorMsg) => {
            this.snackBar.open(errorMsg, '', {
                duration: 4000,
                panelClass: ['red-snackbar']
            });
        });
    }

}
