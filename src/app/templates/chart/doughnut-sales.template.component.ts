import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/features/dashboard/dashboard-service/dashboard.service';
import { SalesData, SalesDataPayload } from 'src/app/features/dashboard/dashboard-service/model/sales-data.model';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ReportService } from 'src/app/features/dashboard/report-service/report.service';
import { SocketService } from '@shared/service/socket-servie/socket.service';


@Component({
    selector: 'sales-doughnut-template',
    template: `
 <div class=" flex flex-col w-fit h-full" *ngIf="getSalesData">
        
        <div class="mt-1 mb-2 flex  space-x-3 items-center ">
            <p class="text-[#6C757D] text-lg">Total {{salesDataPayload.filterType == 'SALES' || salesDataPayload.filterType == undefined ? 'Sales' : 'Quantity'}} Amount: </p>
             <p class="text-customPrimary font-semibold text-2xl">  {{(['SALES', undefined, null].includes(salesDataPayload.filterType) ? (currency + ' ' +  getSalesData.totalSales) : getSalesData.totalQuantity)}}</p>
             <default-button-template text="Download" (clicked)="downloadSales()" *ngIf="!isDashboard"></default-button-template>
          </div>
  
          <div class="flex space-x-1">
            <div class="card flex h-full">
                
                <p-chart type="pie" [data]="data" [options]="options" [plugins]="plugins" width="500px" height="300px"></p-chart>
              </div>
            <div class="flex flex-col justify-between h-full space-y-10  " style="height: 300px;">
  
                <div class="">
                    <p class=" ">Food Type</p>
                  <p-dropdown styleClass="border-2 border-red" [options]="sortByFoodType" (onChange)="onSelectedFoodTypeDropdown($event)"
                    [placeholder]="sortByFoodTypePlaceholder" [autoDisplayFirst]="false"></p-dropdown>
                </div>
        
                <div class="w-5/6  flex justify-center ">
                <div class="flex w-fit h-fit">
                  <div class="text-sm hover:cursor-pointer flex items-center justify-center"
                    (click)="counter != 0 ? counterAction(-1) : null" [class.disabled-div]="counter == 0">
                    <mat-icon [class.disabled-icon]="counter==0">remove</mat-icon>
                  </div>
                  <span class="mx-2">{{counter}}</span>
        
                  <div class="text-3xl hover:cursor-pointer flex items-center justify-center"
                    (click)="counter != getSalesData.totalMenu ? counterAction(1) : null">
                    <mat-icon [class.disabled-icon]="counter == getSalesData.totalMenu">add</mat-icon>
                  </div>
                </div>
                </div>
        
                <div class="">
                    <p class=" ">Sort by</p>
    
        <p-dropdown [options]="sortBy" (onChange)="onSelectedDropdown($event)" [placeholder]="sortByPlaceholder"
          [autoDisplayFirst]="false" [virtualScroll]="true"></p-dropdown>
        </div>

              </div>
              
          </div>
      </div>
 
  `,
    styles: [
        `
        ::ng-deep .p-dropdown{
  border: 2px solid gray;
}
        `
    ],
})
export class DoughnutSalesComponent extends CommonVariable implements OnInit, OnChanges, OnDestroy {

    sortByPlaceholder = "Sales"
    sortByFoodTypePlaceholder = "All"
    plugins: any;
    data: any;
    options: any;

    getSalesData !: SalesData

    salesDataPayload !: SalesDataPayload

    getSalesDataSubscription$ !: Subscription
    generatedColors: any[] = [];
    generatedColorsString: string[] = [];

    colors : string[] =  ['green', 'yellow', 'cyan', 'pink', 'indigo', 'teal', 'orange', 'bluegray', 'purple', 'red', 'gray']
    colorNumbers : string[] = ['300', '400', '500', '600', '700', '800', '900']

    documentStyle: any
    @Input() counter: number = 5
    @Input() fromDate?: string = undefined
    @Input() toDate?: string = undefined
    @Input() isDashboard : boolean = false;
  salesDataDownloadSubscription$ !: Subscription
  salesDataSocket$ !: Subscription


    sortBy: any[] = [
        { label: "Sales" },
        { label: "Quantity" },
    ];

    sortByFoodType: any[] = [
        { label: "All" },
        { label: "Meal" },
        { label: "Drinks" },
        { label: "Misc" },
    ];





    constructor(private dashboardService: DashboardService, private reportService: ReportService,
        private socketService: SocketService
    ) {
        super()
    }

    
    ngOnInit() {
        this.salesDataSocket$ = this.socketService.salesDataSubject.subscribe(
            (res) => {
              this.fetchChart()
            }
          )
        this.fetchChart();



    }

    fetchChart(){
        if(this.isDashboard){

            this.salesDataPayload = {
                limit: this.counter,
                fromDate: this.fromDate,
                toDate: this.toDate,
            }
    
            this.createChart()
            this.updateSalesData()
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.fromDate || changes.toDate) {
            this.salesDataPayload = {
                limit: this.counter,
                fromDate: this.fromDate,
                toDate: this.toDate,
            }
    
            this.createChart()
            this.updateSalesData()
          }
    }
    

    downloadSales(){
        this.salesDataDownloadSubscription$ = this.reportService.getSalesData(this.salesDataPayload).subscribe(
          (res : any) => {
            this.salesDataDownloadSubscription$.unsubscribe()
            const blob = new Blob([res], { type: 'application/octet-stream' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'sales_data.xlsx'; // Set your desired file name here
            link.click();
          }
        )
      }

    onSelectedDropdown(event: any) {
        this.salesDataPayload.filterType = event.value.label.toUpperCase()
        this.updateSalesData()
    }

    onSelectedFoodTypeDropdown(event: any) {
        this.salesDataPayload.foodType = event.value.label == 'All' ? undefined : (event.value.label).toUpperCase()
        this.generatedColors = []
        this.updateSalesData()
    }
    counterAction(val: number) {
        if ((this.counter > 0 || val == 1) && (this.counter < this.getSalesData.totalMenu || val == -1)) {
            if (val == -1) {
                this.counter--;
                this.generatedColors.pop()

            } else if (val == 1) {
                this.counter++;
                this.generatedColors.push(this.generateRandomColor())
            }
            this.salesDataPayload.limit = this.counter
            this.updateSalesData()
        }
    }

    updateSalesData() {
        this.getSalesDataSubscription$ = this.dashboardService.getSalesData(this.salesDataPayload).subscribe(
            (res) => {

                let val = res.data
                this.getSalesData = val

                if (this.generatedColors.length == 0) {
                    for (let i = 0; i < val.labels.length; i++) {
                        this.generatedColors.push(this.generateRandomColor());
                        // this.generatedColors.push(this.documentStyle.getPropertyValue(this.generateRandomColor()));
                    }
                }
                if (val.totalMenu < this.counter) { this.counter = val.totalMenu }

                this.data = {
                    labels: val.labels,
                    datasets: [
                        {
                            datalabels: {
                                formatter: (value: any, ctx: any) => {
                                    const label = ctx.chart.data.labels[ctx.dataIndex];
                                    return label + '\n' + ((Number.parseInt(value) / (['SALES', undefined, null].includes(this.salesDataPayload.filterType) ? val.totalSales : val.totalQuantity)) * 100).toFixed(2) + '%';
                                },
                                color: '#FFFFFF',
                            },
                            // data: [3],
                            data: ['SALES', undefined, null].includes(this.salesDataPayload.filterType) ? val.salesData : val.quantityData,
                            // data: [300, 50, 100],
                            backgroundColor: this.generatedColors,
                            hoverBackgroundColor: this.generatedColors
                            // backgroundColor: [this.documentStyle.getPropertyValue('--blue-500'), this.documentStyle.getPropertyValue('--yellow-500'), this.documentStyle.getPropertyValue('--green-500')],
                            // hoverBackgroundColor: [this.documentStyle.getPropertyValue('--blue-400'), this.documentStyle.getPropertyValue('--yellow-400'), this.documentStyle.getPropertyValue('--green-400')]
                        }
                    ]
                };
            }
        )
    }


    createChart() {
        this.documentStyle = getComputedStyle(document.documentElement);
        const textColor = this.documentStyle.getPropertyValue('--text-color');

        this.options = {

            cutout: '40%',
            plugins: {

                legend: {
                    position: 'right',
                    labels: {

                        // color: textColor
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


    generateRandomColor(): any {
        let str = this.stringColorCodeGenerator()
        if(this.generatedColorsString.length !=0){
            let run = true;
            while(run){
                if(this.generatedColorsString.includes(str)){
                    str = this.stringColorCodeGenerator()
                }else{
                    run = false
                }
            }
        }
     

        this.generatedColorsString.push(str)
        return this.documentStyle.getPropertyValue(str)
    }

    stringColorCodeGenerator(){
        return `--${this.colors[this.generateRandomNumber(0, this.colors.length)]}-${this.colorNumbers[this.generateRandomNumber(0, this.colorNumbers.length)]}`
    }

     generateRandomNumber(min: number, max: number): number {
       max--;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    ngOnDestroy(): void {
        if (this.getSalesDataSubscription$) {
            this.getSalesDataSubscription$.unsubscribe()
        }
        if(this.salesDataDownloadSubscription$){
            this.salesDataDownloadSubscription$.unsubscribe()
        }
        if(this.salesDataSocket$){
            this.salesDataSocket$.unsubscribe()
        }
    }



}
