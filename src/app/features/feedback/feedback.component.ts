import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FeedbackService } from './feedback-service/feedback.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, OnDestroy {

  feedbackForm !: FormGroup
  postFeedbackDetails$ !: Subscription
  getFeedbackStatus$ !: Subscription
  statusList !: string[]
  constructor(private fb: FormBuilder, private feedbackService: FeedbackService, private router: ActivatedRoute){}

  ngOnInit(): void {
    this.getFeedbackStatus$ = this.feedbackService.getFeedbackStatus().subscribe(
      (response) => {
        this.statusList = response.data
      }
      )
      this.feedbackForm = this.fb.group({
        feedbackStatus: ['', Validators.required],
        foodId: ['', Validators.required], // Add validators for foodId
        feedbacks: ['', Validators.required], // Add validators for feedbacks
        isAnonymous: false,
      });
      
      
      this.router.params.subscribe(
        (params) => {
          this.feedbackForm.get('foodId')!.setValue(params['id']);
        }
      );
  }




  onSubmit() {
    console.log(this.feedbackForm.value)
    this.postFeedbackDetails$ = this.feedbackService.postFeedbacks(this.feedbackForm.value).subscribe(
      (results) => {
        console.log(results);
        this.postFeedbackDetails$.unsubscribe();
      }
    );
  }

  

  ngOnDestroy(): void {
    if(this.postFeedbackDetails$){
      this.postFeedbackDetails$.unsubscribe()
    }
  }

   formValue(name : string) {
    return this.feedbackForm.get(name);
  }

  

}
