import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router/';

@Component({
  selector: 'user-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;

  constructor(private authService: AuthenticationService, private router: Router,
    private snackBar: MatSnackBar) { 
      this.user = { userId: '', password: '', firstName: '', lastName: ''};
    }

  ngOnInit() {
  }

  registerUser() {
    this.authService.registerUser(this.user).subscribe((data) => {
      this.router.navigate(['/login']);
    }, (errorMsg) => {
      this.snackBar.open(errorMsg, '', {
        duration: 4000,
        panelClass: ['red-snackbar']
      });
    });
  }

}
