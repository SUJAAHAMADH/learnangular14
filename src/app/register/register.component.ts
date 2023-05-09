import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private builder:FormBuilder,
    private toastr:ToastrService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }

  registerForm = this.builder.group ({
      id : this.builder.control('', Validators.compose([Validators.required,Validators.minLength(5)])),
      name : this.builder.control('',Validators.required),
      password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
      email : this.builder.control('',Validators.compose([Validators.required,Validators.email])),
      gender : this.builder.control('male'),
      role : this.builder.control(''),
      isActive : this.builder.control(false),

    });


    proceedRegistration()
    {
      if(this.registerForm.valid){
        this.authService.proceedRegister(this.registerForm.value).subscribe(res =>{
          this.toastr.success('Please contact Admin for enable access','Registered Successfully');
          this.router.navigate(['login']);
        });
      }
      else{
      this.toastr.warning('Please enter valid data');
      }
    }

}
