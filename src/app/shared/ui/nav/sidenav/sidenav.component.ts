import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarConstant } from 'src/app/constant/navbar/navbar-data.model';

export interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean
}


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  labelData = NavbarConstant
  currentRoute: string = '';
  collapsed = false;
  screenWidth = 0;



  constructor(private router: Router) {}


  toggleCollapse(){
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }
  
  closeSideNav(){
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }



}
