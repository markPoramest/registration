import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { Validators, FormGroup , FormControl, ValidatorFn } from '@angular/forms';
declare var jQuery: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmedPassword : new FormControl('')
  });
  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }
  get confirmedPassword() { return this.userForm.get('confirmedPassword'); }
  constructor(private service:RegistrationService, private router:Router) {
   
   }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(this.userForm.get('firstName').value, [ Validators.required,]),
      lastName: new FormControl(this.userForm.get('lastName').value, [ Validators.required,]),
      email: new FormControl(this.userForm.get('email').value, [ Validators.required,Validators.email]),
      password: new FormControl(this.userForm.get('password').value, [ Validators.required,Validators.minLength(8)]),
      confirmedPassword : new FormControl(this.userForm.get('confirmedPassword').value, [ Validators.required]),
    }
    );
  
} 
private passwordsShouldMatch(fGroup: FormGroup) {
  return fGroup.get('password').value === fGroup.get('confirmedPassword').value
    ? null : {'mismatch': true};
}


  registerUser(){
    if (this.userForm.valid) {
    this.service.registerUserFromRemote(this.userForm).subscribe(
      data=>{
        console.log("Register Success");
        (function ($) {
          $('#ModalSuccess').modal('show');
        })(jQuery);
        
      },
      error=>{
        (function ($) {
          $('#ModalFail').modal('show');
        })(jQuery);
        console.log("Register Unsuccess")}
    );
    }else{
      this.validateAllFormFields(this.userForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  gotoLogin(){
    this.router.navigate(['']);
  }    
}
