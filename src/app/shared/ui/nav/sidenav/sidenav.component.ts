import { AfterViewInit, Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarConstant } from 'src/app/constant/navbar/navbar-data.model';
import { SidenavService } from './sidenav-service/sidenav.service';

export interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean
}


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  labelData = NavbarConstant
  currentRoute: string = '';
  collapsed = false;
  screenWidth = 0;


  @HostListener('window: resize', ['$event'])
  onResize(event: any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 500){
      this.collapsed = true;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
    }
    this.sidenavService.setScreenResize(this.screenWidth);
  }

  constructor(private router: Router, private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }


  toggleCollapse(){
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
    this.sidenavService.setCollapsed(this.collapsed);
  }
  
  closeSideNav(){
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }



}
