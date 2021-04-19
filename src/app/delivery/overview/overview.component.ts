import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DeliveryService } from '../services/delivery.service';
import { Deliverer } from '@app/_models/deliverer';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  chart = [];
  orders: any[];
  opinions: any[];
  deliverer: Deliverer;
  countOrderCurrent: string;
  amountOrderCurrent: string;
  dtRangeForm: FormGroup;
  date: Date;
  dateDisplay: string;
  period: string;
  rangeDate : any;
  observableList : Array<Observable<any>>;
  loading: boolean;

  constructor(
    private  deliveryService: DeliveryService,
    private formBuilder: FormBuilder,
    ) {
      
    const dtstart = new Date();
    const dtend = new Date();

    this.dtRangeForm = this.formBuilder.group({
      dtstart: dtstart,
      dtend: dtend
    });
  }

  ngOnInit(): void {
    this.orders = new Array<any>();
    this.date = new Date();
    this.dateDisplay  = this.date.toLocaleString();

    this.getAnalyseDeliverer();
  }

  onValidate() {
    this.getAnalyseDeliverer();
  }

  private getAnalyseDeliverer() {
    this.rangeDate = {dtstart : this.dtRangeForm.value.dtstart.toLocaleDateString(), dtend : this.dtRangeForm.value.dtend.toLocaleDateString()};

    this.observableList = new Array<Observable<any>> ();
    this.observableList.push(this.deliveryService.getOrderAnalize(1, this.rangeDate));
    this.observableList.push(this.deliveryService.getOrdersDelivererAnalize(this.rangeDate));

    const exec = forkJoin( [this.deliveryService.getOrderAnalize(1, this.rangeDate),this.deliveryService.getOrdersDelivererAnalize(this.rangeDate)] )
    .pipe(
      map( ([analyseOrder, deliverer]) => {
        return {analyseOrder, deliverer}
      })
    );

    this.loading = true;
    exec.subscribe( result => {
      console.log('response',result);
      this.getAnalyze(result.analyseOrder);
      this.orders = result.deliverer.orders;
      console.log("terminate");
      this.loading = false;
      setTimeout(() => {
      }, 0);
    });
  }  
  
  private getAnalyze (response: any) {
        this.amountOrderCurrent = ((response.delivery_cost).toFixed(2)).replace('.', ',');
        this.countOrderCurrent = response.count;
        this.period = response.period;
        const ctx = document.getElementById('myChart');
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [response.period],
            datasets: [{
              label: 'Livraisons par mois',
              data: [response.delivery_cost],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
  }
}
