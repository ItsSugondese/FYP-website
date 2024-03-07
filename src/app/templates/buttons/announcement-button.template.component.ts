import { Component } from '@angular/core';


@Component({
  selector: 'announcement-button-template',
  template: `
<div class="top-right" (click)="visible = true">
      <default-button-template [text]="'Make Announcement'"></default-button-template>

    </div>

    <announcement-pop-up-template [visible]="visible" (visibleChange)="visible = false"></announcement-pop-up-template>
  `,
  styles: [`
  `
],
})
export class AnnouncementButtonComponent{

    visible :boolean = false
    constructor() { }
  
    
}
