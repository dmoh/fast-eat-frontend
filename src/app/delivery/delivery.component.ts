import { AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DeliveryService } from './services/delivery.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { User } from '@app/_models/user';
import { AuthenticationService } from '@app/_services/authentication.service';
import jwtDecode from 'jwt-decode';
import { MediaQueryService } from '@app/_services/media-query.service';
import { SidenavService } from '@app/sidenav-responsive/sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit, AfterViewInit {

  orders: any;
  deliverer: User;
  authorizedRoles: string[] = ["ROLE_SUPER_ADMIN","ROLE_DELIVERER"];
  isMedia: boolean;

  @ViewChild('sidebarLeft') 
  public sidenav: MatSidenav;

  constructor(private deliveryService: DeliveryService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authenticate: AuthenticationService,
    private mediaQueryService: MediaQueryService,
    private sidenavService: SidenavService,
    private bottomSheet: MatBottomSheet) { 
      this.rolesBloqued();
    }

  @Output() sidenavChange = new EventEmitter<MatSidenav>();

  ngOnInit(): void {
    // recuperer la geoloc
    if(navigator.geolocation) {
      // L'API est disponible
    } else {
      // Pas de support, proposer une alternative ?
    }
    this.sidenavChange.emit(this.sidenav);
    this.isMedia = this.mediaQueryService.getMedia().matches;
    this.mediaQueryService.getMedia().addEventListener("change", e => this.onMediaChange(e));
    console.log("Before",this.isMedia);
  }

  onMediaChange(e: any) {
    this.isMedia = e.matches;
  }

  rolesBloqued() {
    let currentUser: any = jwtDecode(this.authenticate.currentUserValue.token);

    if (typeof currentUser != undefined && currentUser.roles && currentUser.roles.length > 0) {
      let isAuthorized: boolean = false;
      this.authorizedRoles.forEach( role => {
        isAuthorized = currentUser.roles.includes(role.trim()) || isAuthorized;
      });

      if (!isAuthorized) {
        console.log("Vous n'avez pas acces à cette page vous n'êtes pas un livreur.");
        this.router.navigate(['home']);
      }
    } else {
      this.router.navigate(['home']);
    }
  }

  ngAfterViewInit() { 
    this.sidenavService.sideNavToggleSubject.subscribe(()=> {
       return this.sidenav.toggle();
     });
    console.log("After",this.isMedia);
  } 
  
}
