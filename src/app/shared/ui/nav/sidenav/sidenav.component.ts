import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarConstant } from 'src/app/constant/navbar/navbar-data.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{
  labelData = NavbarConstant
  currentRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.router.events
    //   .pipe(
    //     filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    //   )
    //   .subscribe((event: NavigationEnd) => {
    //     this.currentRoute = event.urlAfterRedirects;
    //     console.log(this.currentRoute)
    //   });
      // this.router.events
      // .pipe(
      //   filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      // )
      // .subscribe((event: NavigationEnd) => {
      //   console.log('NavigationEnd event:', event);
      //   this.currentRoute = event.urlAfterRedirects;
      // });
      
      console.log(this.currentRoute)
  }

  // ngOnInit(): void {
  //   const sidebar = document.querySelector(".sidebar");
  //   const closeBtn = document.querySelector("#btn");
  //   const searchBtn = document.querySelector(".bx-search")

  //   if(closeBtn && sidebar){
  //   closeBtn.addEventListener("click", () => {
  //     sidebar.classList.toggle("open");
  //     this.menuBtnChange(closeBtn);
  //   });
  // }

  // if(searchBtn && sidebar && closeBtn){
  //   searchBtn.addEventListener("click", () => {
  //     sidebar.classList.toggle("open");
  //     this.menuBtnChange(closeBtn);
  //   });
  // }
  // }

  // menuBtnChange(closeBtn: Element ) {
  //   if (closeBtn && closeBtn.classList.contains("bx-menu")) {
  //     closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  //   } else if (closeBtn) {
  //     closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  //   }
  // }



}
