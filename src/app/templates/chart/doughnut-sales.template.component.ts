import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonVariable } from '@shared/helper/inherit/common-variable';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/features/dashboard/dashboard-service/dashboard.service';
import { SalesData, SalesDataPayload } from 'src/app/features/dashboard/dashboard-service/model/sales-data.model';
import ChartDataLabels from 'chartjs-plugin-datalabels';


@Component({
    selector: 'sales-doughnut-template',
    template: `
  <div class=" flex flex-col w-fit items-center " *ngIf="getSalesData">
      
    
      <div class="flex items-center justify-between w-full ">

        <div>
          <p-dropdown styleClass="border-2 border-red" [options]="sortByFoodType" (onChange)="onSelectedFoodTypeDropdown($event)"
            [placeholder]="sortByFoodTypePlaceholder" [autoDisplayFirst]="false"></p-dropdown>
        </div>

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

        <div>
          <p-dropdown [options]="sortBy" (onChange)="onSelectedDropdown($event)" [placeholder]="sortByPlaceholder"
            [autoDisplayFirst]="false"></p-dropdown>
        </div>
      </div>

      <div class="card flex ">
        <div class="pr-2 pl-2 mt-1 mb-2 flex  justify-between items-center w-full ">
        <p class="text-[#6C757D] text-lg">Total {{salesDataPayload.filterType == 'SALES' || salesDataPayload.filterType == undefined ? 'Sales' : 'Quantity'}} Amount: </p>
         <p class="text-customPrimary font-semibold text-2xl">  {{(['SALES', undefined, null].includes(salesDataPayload.filterType) ? (currency + ' ' +  getSalesData.totalSales) : getSalesData.totalQuantity)}}</p>
      </div>
        <p-chart type="pie" [data]="data" [options]="options" [plugins]="plugins"></p-chart>
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
export class DoughnutSalesComponent extends CommonVariable implements OnInit, OnDestroy {

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





    constructor(private dashboardService: DashboardService) {
        super()
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

    ngOnInit() {

        this.salesDataPayload = {
            limit: this.counter,
            fromDate: this.fromDate,
            toDate: this.toDate,
        }

        this.createChart()
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
                    position: 'bottom',
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
    }



}
