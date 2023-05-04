import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { TokenService } from 'src/app/service/token/token.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  name = 'Angular';
  width: number = 700;
  height: number = 300;
  fitContainer: boolean = false;

  public lineChartData: ChartConfiguration<'line'>['data'] =
    {
      labels:
        [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
      datasets:
        [
          {
            data: [23, 8, 16, 21, 15, 36, 20],
            label: 'nbr demandes',
            fill: true,
            tension: 0.5,
            borderColor: 'grey',
            backgroundColor: 'rgba(34,197,74,1)'
          }
        ]
    };

  public doghntChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };

  public lineChartLegend = true;


  public doughnutChartLabels: string[] = ['IN', 'BSCS', 'CRM', 'BI'];
  public doughnutChartData: any[] = [11, 5, 8];
  chartOptions = {
    responsive: false,

  };

  dateForamt(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() - 1}-${date.getDate()}\n ${date.getHours()}:${date.getMinutes()} `;
  }

  /* 
  
  
  
  
  */



  canvas: any;
  ctx: any;
  @ViewChild('pieCanvas') pieCanvas!: { nativeElement: any };

  pieChart: any;


  ngAfterViewInit(): void {
    if (this.collabROle === "SUPERADMIN"){
      this.pieChartBrowser();
    }
      
  }

  pieChartBrowser(): void {
    this.canvas = this.pieCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.pieChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ['IN', 'BSCS', 'CRM', 'BI'],
        datasets: [
          {
            backgroundColor: [
              '#2ecc71',
              '#9b59b6',
              '#f1c40f',
              '#e74c3c',
            ],
            data: [11, 5, 8, 3],
          },
        ],
      },
    });
  }

  constructor(private tokenService: TokenService) {
  }

  collabROle: string = "";

  ngOnInit() {
    if (this.tokenService.getCollabRole() !== "")
      this.collabROle = this.tokenService.getCollabRole();
  }
}