import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{
  ngOnInit(): void {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");
    const searchBtn = document.querySelector(".bx-search")

    if(closeBtn && sidebar){
    closeBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      this.menuBtnChange(closeBtn);
    });
  }

  if(searchBtn && sidebar && closeBtn){
    searchBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      this.menuBtnChange(closeBtn);
    });
  }
  }

  menuBtnChange(closeBtn: Element ) {
    if (closeBtn && closeBtn.classList.contains("bx-menu")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else if (closeBtn) {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  }



}
