import { Component } from '@angular/core';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent {

  fromDate: string = "2024-01-01"
            toDate: string = "2024-03-28"
}
