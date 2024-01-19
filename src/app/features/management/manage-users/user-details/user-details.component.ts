import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../manage-users-service/model/user.model';
import { ActivatedRoute } from '@angular/router';
import { ManageUsersService } from '../manage-users-service/manage-users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  
  id!: number
  imageId$ !: Subscription;
  user !: User;
  userFetch$ !: Subscription;


  constructor(private router: ActivatedRoute, private userService: ManageUsersService){}


  ngOnInit(): void {
    this.router.params.subscribe(
      (params) => {
        this.id = params['id']
      }
    );

    this.userFetch$ = this.userService.getSingleUser(this.id).subscribe(

      (response) => {
        this.user = response.data;
        }
    );
  }


  ngOnDestroy(): void {
    if(this.imageId$){
      this.imageId$.unsubscribe();
    }
    if(this.userFetch$){
      this.userFetch$.unsubscribe();
    }
  }


}
