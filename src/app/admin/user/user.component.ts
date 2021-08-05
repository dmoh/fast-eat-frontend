import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from "@app/admin/admin.service";
import {Deliverer} from "@app/_models/deliverer";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalUserComponent} from "@app/admin/modal-user/modal-user.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {
  month: string;
  deliverers: Deliverer[];
  displayedColumns: string[] = ['id', 'email', 'phone', 'siret', 'ca', 'nbDeliveries', 'ratio'];
  dataSource: MatTableDataSource<Deliverer[]>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  periodBegin: string;
  periodEnd: string;
  periods: any[] = [
    {
      value: '11/2020',
      label: '11/2020'
    },
    {
      value: '12/2020',
      label: '12/2020'
    },
    {
      value: '01/2021',
      label: '01/2021'
    },
    {
      value: '02/2021',
      label: '02/2021'
    },
    {
      value: '03/2021',
      label: '03/2021'
    },
    {
      value: '04/2021',
      label: '04/2021'
    },
    {
      value: '05/2021',
      label: '05/2021'
    },
    {
      value: '06/2021',
      label: '06/2021'
    },
    {
      value: '07/2021',
      label: '07/2021'
    },
    {
      value: '08/2021',
      label: '08/2021'
    },
    {
      value: '09/2021',
      label: '09/2021'
    },
    {
      value: '10/2021',
      label: '10/2021'
    },
    {
      value: '11/2021',
      label: '11/2021'
    },
    {
      value: '12/2021',
      label: '12/2021'
    }
  ];

  constructor(
    private adminService: AdminService,
    private modal: NgbModal
  ) { }

  ngOnInit(): void {
    this.adminService.getDelivererList()
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource<Deliverer[]>(res.deliverers);
        this.deliverers = res.deliverers;
        this.month = res.month;
        setTimeout(() => {
          this.dataSource.sort = this.sort;
        }, 100);
      });
  }


  ngAfterViewInit() {
  }

  private getByPeriod() {
    this.adminService.postDelivererList(this.periodBegin)
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource<Deliverer[]>(res.deliverers);
        this.deliverers = res.deliverers;
        this.month = res.month;
        setTimeout(() => {
          this.dataSource.sort = this.sort;
        }, 100);
      });
  }


  onValidate() {
    if (this.periodBegin) {
      this.getByPeriod();
    }
  }

  onChange(event) {
    console.warn(this.periodBegin);
  }

  onAddDeliverer() {
    const modalRef = this.modal.open(ModalUserComponent);
    modalRef.result.then((res) => {
      if (res) {
        this.ngOnInit();
      }
    });
  }
}
