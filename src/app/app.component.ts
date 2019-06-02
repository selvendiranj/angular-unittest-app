import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from './modules/authentication/services/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: ['./app.component.css']
})
export class AppComponent implements OnInit {
    isLoginPage: boolean;
    loginUrls: Array<String>;

    constructor(private router: Router, private location: Location, private authService: AuthenticationService) {
        this.isLoginPage = false;
        this.loginUrls = ['/', '/login', '/register'];
        router.events.subscribe((val) => {
            let curPath = location.path();
            if (curPath) {
                this.isLoginPage = this.loginUrls.indexOf(this.router.url) >= 0;
            }
        });
    }

    ngOnInit() {
    }

    logoutUser() {
        this.authService.removeAuthToken();
        this.router.navigate(['/login']);
    }
}
