import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { SidenavService } from '@shared/ui/nav/sidenav/sidenav-service/sidenav.service';
import { SideNavToggle } from '@shared/ui/nav/sidenav/sidenav.component';

@Component({
  selector: 'app-management-layout',
  templateUrl: './management-layout.component.html',
  styleUrls: ['./management-layout.component.scss']
})
export class ManagementLayoutComponent implements AfterViewInit {
  // isSideNavCollapsed = false;
  screenWidth = 0;


  constructor(public sidenavService: SidenavService, private cdr: ChangeDetectorRef){}
  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 500); // Snackbar duration

  }
  onToggleSideNav(data: SideNavToggle){
    console.log("here")
    console.log(this.sidenavService.collapsed)
    this.sidenavService.collapsed =  data.collapsed;
    this.screenWidth = data.screenWidth
    this.cdr.detectChanges();
  }

}
