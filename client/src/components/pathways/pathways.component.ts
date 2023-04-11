import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxLoaderSpinnerService } from 'ngx-loader-spinner';
import { UserService } from 'src/services/user.service';
import { PathwayService } from 'src/services/pathways.service';

@Component({
  selector: 'app-pathways',
  templateUrl: './pathways.component.html',
  styleUrls: ['./pathways.component.css'],
})
export class PathwaysComponent {
  constructor(
    private router: Router,
    private spinnerService: NgxLoaderSpinnerService,
    private userService: UserService,
    private pathwayService: PathwayService
  ) {}

  currentPage: string = '';
  isAdmin = sessionStorage.getItem('isAdmin');
  fullName: string = '';
  pathwaysList: any = [];
  selectTab: any = '';

  ngOnInit() {
    this.currentPage = encodeURI(this.router.url);
    this.getUserByQuery();
    this.getPathwaysByQuery();
  }

  getPathwaysByQuery() {
    this.spinnerService.show();
    try {
      this.pathwayService.getPathwaybyQuery(`visible=true`).subscribe(
        (response: any) => {
          console.log(`Pathway Data: ${JSON.stringify(response)}`);
          this.pathwaysList = response.body;
          this.selectTab = this.pathwaysList[0].pathway;
          this.spinnerService.hide();
        },
        (err: any) => {
          console.error(`Error [getPathway]:  , ${JSON.stringify(err.error)}`);
          this.spinnerService.hide();
        }
      );
    } catch (err: any) {
      console.error(`Error [getPathway]:  , ${JSON.stringify(err)}`);
      this.spinnerService.hide();
    }
  }

  getUserByQuery() {
    this.spinnerService.show();
    try {
      this.userService
        .getUserbyQuery(`_id=${sessionStorage.getItem('userId')}`)
        .subscribe(
          (response: any) => {
            console.log(`User Data: ${JSON.stringify(response)}`);
            this.fullName =
              response.body[0].firstName + ' ' + response.body[0].lastName;
            this.spinnerService.hide();
          },
          (err: any) => {
            console.error(`Error [getUser]:  , ${JSON.stringify(err.error)}`);
            this.spinnerService.hide();
          }
        );
    } catch (err: any) {
      console.error(`Error [getUser]:  , ${JSON.stringify(err)}`);
      this.spinnerService.hide();
    }
  }
}
