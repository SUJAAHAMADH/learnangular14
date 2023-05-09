import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  result: any;

  constructor(private builder:FormBuilder,
    private toastr:ToastrService,
    private authService:AuthService,
    private router:Router) {
      sessionStorage.clear();
     }

  ngOnInit(): void {
  }

  loginForm = this.builder.group ({
    id : this.builder.control('',Validators.required),
    password: this.builder.control('',Validators.required),
  });

  proceedLogin() {
    if (this.loginForm.valid) {
      this.authService.GetUserbyCode(this.loginForm.value.id).subscribe(item => {
        this.result = item;
        if (this.result.password === this.loginForm.value.password) {
          if (this.result.isActive) {
            sessionStorage.setItem('username',this.result.id);
            sessionStorage.setItem('role',this.result.role);
            this.router.navigate(['']);
          } else {
            this.toastr.error('Please contact Admin', 'InActive User');
          }
        } else {
          this.toastr.error('Invalid credentials');
        }
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }
}
