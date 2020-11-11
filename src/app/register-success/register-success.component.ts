import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
declare var jQuery: any;
@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.css']
})
export class RegisterSuccessComponent implements OnInit {

  constructor(private service:RegistrationService, private router:Router) {

  }

  ngOnInit(): void {
    (function ($) {
      $('.modal').modal('show');
    })(jQuery);
  }
  gotoLogin(){
    this.router.navigate(['']);
  }   

}
