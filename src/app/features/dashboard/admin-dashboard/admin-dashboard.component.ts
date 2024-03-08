import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable, Subscription, delay, of } from 'rxjs';
import { DashboardService } from '../dashboard-service/dashboard.service';
import { SalesData, SalesDataPayload } from '../dashboard-service/model/sales-data.model';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  
  plugins : any;
  data: any;
  options: any;

  getSalesData !: SalesData
  salesDataPayload !: SalesDataPayload 
  
  getSalesDataSubscription$ !: Subscription
  

  
  sortBy : any[]  = [
    {label: "SALES", value: 'SALES'},
    {label: "QUANTITY" , value: 'QUANTITY' },
  ];

  @ViewChild('counterInput') counterInputRef !: ElementRef;

  constructor(private dashboardService: DashboardService, private renderer: Renderer2) {
  }

  
  ngAfterViewInit() {
    const inputElement = this.counterInputRef.nativeElement;
    this.renderer.setAttribute(inputElement, 'readonly', 'true');

    // Prevent focus when clicking on counter buttons
    this.renderer.listen(inputElement, 'focus', () => {
      inputElement.blur();
    });

    // Prevent default actions for keydown and wheel events
    this.renderer.listen(inputElement, 'keydown', (event) => {
      event.preventDefault();
    });
    this.renderer.listen(inputElement, 'wheel', (event) => {
      event.preventDefault();
    });
  }

  documentStyle : any
  counter : number = 0

  onSelectedDropdown( event : any) {
  this.salesDataPayload.filterType =  event.value == null ? undefined : event.value
  this.updateSalesData()
  }


  ngOnInit() { 

    this.salesDataPayload = {
      limit: 3,
      fromDate: "2024-01-01",
      toDate: "2024-02-28",
    }
    
    this.updateSalesData()

    this.documentStyle = getComputedStyle(document.documentElement);
    const textColor = this.documentStyle.getPropertyValue('--text-color');

    this.options = {
      cutout: '40%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };

    this.plugins = [
        ChartDataLabels,
        {
          id: 'text',
          // afterDraw: function (documentStyle : any, a : any, b : any) {
          //   var width = documentStyle.width,
          //     height = documentStyle.height,
          //     ctx = documentStyle.ctx;

          //   ctx.restore();
          //   var fontSize = (height / (height/2)).toFixed(2);
          //   ctx.font = fontSize + 'em sans-serif';
          //   ctx.textBaseline = 'middle';

          //   var text = '75%',
          //     textX = Math.round((width - ctx.measureText(text).width) / 2),
          //     textY = height / 2;


          //   ctx.fillText(text, textX, textY);
          //   ctx.save();
          // },
        },
      ]

  }

  updateSalesData(){
    this.getSalesDataSubscription$ = this.dashboardService.getSalesData(this.salesDataPayload).subscribe(
      (res) => {

        let val = res.data
         this.getSalesData = val

        this.data = {
          labels:   val.labels,
          datasets: [
            {
              datalabels: {
                formatter: (value : any, ctx : any) => {
                  const label = ctx.chart.data.labels[ctx.dataIndex];
                  return label + '\n' + ((Number.parseInt(value)/ ( ['SALES', undefined, null].includes(this.salesDataPayload.filterType ) ? val.totalSales : val.totalQuantity)) * 100).toFixed(2) + '%';
                },
                color: '#FFFFFF',
                labels: {
                  "Fixing" : 20
                }
              },
              // data: [3],
              data: ['SALES', undefined, null].includes(this.salesDataPayload.filterType ) ? val.salesData : val.quantityData,
              // data: [300, 50, 100],
              backgroundColor: [this.documentStyle.getPropertyValue('--blue-500'), this.documentStyle.getPropertyValue('--yellow-500'), this.documentStyle.getPropertyValue('--green-500')],
              hoverBackgroundColor: [this.documentStyle.getPropertyValue('--blue-400'), this.documentStyle.getPropertyValue('--yellow-400'), this.documentStyle.getPropertyValue('--green-400')]
            }
          ]
        };
      }
    )
  }

  ngOnDestroy(): void {
    if (this.getSalesDataSubscription$) {
      this.getSalesDataSubscription$.unsubscribe()
    }
  }

}
