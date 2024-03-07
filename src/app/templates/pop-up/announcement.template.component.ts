import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AnnouncementService } from '@shared/service/announcement-service/announcement.service';
import { AnnouncementPayload } from '@shared/service/announcement-service/model/announcement-payload.model';
import { Subscription } from 'rxjs';


@Component({
    selector: 'announcement-pop-up-template',
    template: `
 <p-dialog header="Header" [(visible)]="visible" [closable]="true" [style]="{'width': '500px'}" 
[modal]="true" (onHide)="afterHide()">
    <!-- Header Row -->
    <ng-template pTemplate="header">
      <div class="d-flex  justify-content-between align-items-center">
        <div class="h4">Make Announcement</div>
      </div>
    </ng-template>
    <div *ngIf="announcementService.loading">
                                <mat-progress-bar mode="indeterminate"></mat-progress-bar>
                            </div>
<!--   
    <ng-container *ngIf="announcementService.loading; else loaded"> 
        <mat-spinner></mat-spinner>
    </ng-container> -->
    <!-- Content Row -->
    <!-- <ng-template #loaded> -->
    <ng-template pTemplate="content">
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" class="form-control" [(ngModel)]="message" placeholder="Enter your message"
        [disabled]="announcementService.loading"></textarea>
      </div>
    </ng-template>
  
    <!-- Footer Row -->
    <ng-template pTemplate="footer">
      <div class="d-flex justify-content-end align-items-center">
        <div class="mr-2" (click)="visible = false">
          <default-button-template [text]="'Cancel'" [background]="'white'"
          [color]="'customPrimary'" [hasBorder]="true" [isDisabled]="announcementService.loading" ></default-button-template>
        </div>
        
        <div  (click)="postAnnouncement()">
        <default-button-template [text]="'Post'" [hasBorder]="true" [border]="'transparent'"
        [isDisabled]="message == null || message.trim() == '' || announcementService.loading"></default-button-template>
      </div>
    </div>
    </ng-template>
<!-- </ng-template> -->
  </p-dialog>
  `,
    styles: [
    ],
})
export class AnnouncementPopUpComponent implements OnInit,OnDestroy {

    message: string | null = null
    @Input() visible: boolean = false;

    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();

    postAnnouncementSubscription$ !: Subscription

    constructor(public announcementService: AnnouncementService) { }

    ngOnInit(): void {
    }

    postAnnouncement() {
        let val: AnnouncementPayload = {
            message: this.message!
        }
        this.postAnnouncementSubscription$ = this.announcementService.postAnnouncement(val).subscribe({
            next: res => this.visible =  false
        })
    }

    afterHide() {
        this.message = null
        this.visibleChange.emit(false);
    }

    ngOnDestroy(): void {
        if (this.postAnnouncementSubscription$) {
            this.postAnnouncementSubscription$.unsubscribe()
        }
    }

}
