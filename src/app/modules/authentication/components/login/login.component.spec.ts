import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Location } from '@angular/common';
import { TestBed, async, fakeAsync, ComponentFixture, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { User } from '../../models/user';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '../../services/authentication.service';
import { Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DebugElement } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthGuardService } from 'src/app/modules/movie/services/auth-guard.service';
import { TmdbContainerComponent } from 'src/app/modules/movie/components/tmdb-container/tmdb-container.component';
import { MovieModule } from 'src/app/modules/movie/movie.module';

const testMockConfig = {
    userdata: {
        firstName: 'testfirst',
        lastName: 'testlast',
        userId: 'testuser',
        password: 'testpass'
    }
};

describe('LoginComponent', () => {
    let authService: AuthenticationService;
    let loginComponent: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let routes: Route;
    let spyUser: any;
    let location: Location;

    class AuthenticationServiceStub {
        currentUser: User;

        constructor() { }

        authenticateUser(credentials) {
            if (credentials.userId === testMockConfig.userdata.userId) {
                return Observable.of(credentials.userId);
            }
            return Observable.of(false);
        }

        getAuthToken() {
            return 'eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlL';
        }

        isAuthTokenExpired() {
            return false;
        }
    }

    class Dummy { }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule, FormsModule,
                MatInputModule, MatToolbarModule, MatButtonModule, MatCardModule,
                MatDialogModule, MatFormFieldModule, MatButtonModule, MatSnackBarModule,
                BrowserAnimationsModule, MovieModule,
                RouterTestingModule.withRoutes([
                    {
                        path: 'movies',
                        children: [
                            { path: 'popular', component: TmdbContainerComponent, data: { movieType: 'popular' }, canActivate: [AuthGuardService] }
                        ]
                    }
                ])
            ],
            declarations: [LoginComponent],
            providers: [{
                provide: AuthenticationService,
                useClass: AuthenticationServiceStub
            }]
        }).compileComponents();
    }));

    beforeEach(() => {
        routes = TestBed.get(Router);
        location = TestBed.get(Location);
        fixture = TestBed.createComponent(LoginComponent);
        loginComponent = fixture.componentInstance;
        fixture.detectChanges();
        fixture.debugElement.injector.get(AuthenticationService);
    });

    it('should create the login component', async(() => {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should contain four elements for login user', async(() => {
        const userIdInput = fixture.debugElement.query(By.css('.user-id')).nativeElement;
        const passwordInput = fixture.debugElement.query(By.css('.password')).nativeElement;
        const loginBtnInput = fixture.debugElement.query(By.css('.login-user-btn')).nativeElement;
        const regBtnInput = fixture.debugElement.query(By.css('.reg-btn')).nativeElement;
        expect(userIdInput).toBeTruthy();
        expect(passwordInput).toBeTruthy();
        expect(loginBtnInput).toBeTruthy();
        expect(regBtnInput).toBeTruthy();
    }));

    it('should redirect to login', async(() => {
        const userIdInput = fixture.debugElement.query(By.css('.user-id')).nativeElement;
        const passwordInput = fixture.debugElement.query(By.css('.password')).nativeElement;
        const loginBtnInput = fixture.debugElement.query(By.css('.login-user-btn')).nativeElement;
        const regBtnInput = fixture.debugElement.query(By.css('.reg-btn')).nativeElement;

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            userIdInput.value = 'testuser';
            passwordInput.value = 'testpass';
            userIdInput.dispatchEvent(new Event('input'));
            passwordInput.dispatchEvent(new Event('input'));
            loginBtnInput.click();
        }).then(() => {
            expect(location.path()).toBe('/movies/popular');
        });
    }));
});
