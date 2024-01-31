import { Component } from '@angular/core';
import { SideNavToggle } from './shared/ui/nav/sidenav/sidenav.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FYP';

  isSideNavCollapsed = false;
  screenWidth = 0;


  onToggleSideNav(data: SideNavToggle){
    
  }
}
