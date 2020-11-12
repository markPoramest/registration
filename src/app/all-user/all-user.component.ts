import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
declare var jQuery: any;
@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {
  user:User[];
  user2 = new User();
  
  constructor(private _service:RegistrationService, private _route:Router , private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this._service.fetchUserListFromRemote().subscribe(
      data=>{console.log("response recieved");
      this.user = data;
      },
      error=>console.log("exception occured")
    );
 
  }

  gotoLogin(){
    this._route.navigate(['']);
  }    

  editUser(id:Number){
    this._route.navigate(['/edit',id]);
  }

  viewUser(id:Number){
    this._route.navigate(['/viewEmployee',id]);
  }

  deleteUser(id:Number){
    this._service.deleteUserListbyIdFromRemote(id).subscribe(
      data=>console.debug("Success"),
      error=>console.log("Error")
    )
    location.reload();
  }



}
