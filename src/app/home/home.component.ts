import {Component, ElementRef, OnDestroy, OnInit, HostListener, Output, EventEmitter, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CityDataService} from '../city-data.service';
import {RestaurantDashboardService} from '@app/restaurants/restaurant-dashboard/services/restaurant-dashboard.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LocationModalComponent} from '@app/location-modal/location-modal.component';
import {AdminService} from '@app/admin/admin.service';
import {CategoryBusiness} from '@app/_models/category-business';
import {CategoryRestaurantService} from '@app/_services/category-restaurant.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  options: {} = {};
  cityDataCurrent: any;
  selectedAddress: any;
  slideHeight: string = '200px';
  maintainAspectRatio: boolean = false;
  showingLeftPart: boolean = true;
  @Input() closeModal;
  slides: any[] = [
    {
      image: 'https://mediafastitprod.s3.eu-west-3.amazonaws.com/PHOTO-2021-03-16-10-38-38.jpg'
    },
    {
      image: 'https://mediafastitprod.s3.eu-west-3.amazonaws.com/PHOTO-2021-03-16-10-39-53.jpg'
    }/*,
    {
      image: 'https://mediafastitprod.s3.eu-west-3.amazonaws.com/PHOTO-2021-03-14-21-59-12+(1).jpg'
    },*/
  ];
  restaurants: any[];
  restaurantsLeft: any[];
  restaurantsRight: any[];
  categories: any[];
  constructor(
              private cityData: CityDataService,
              private restaurantService: RestaurantDashboardService,
              private modal: NgbModal,
              private elementRef: ElementRef,
              private adminService: AdminService,
              private categoryRestaurantService: CategoryRestaurantService,
              private router: Router,
              private route: ActivatedRoute
              ) {
    this.router.events.subscribe((event) => {
      setTimeout(() => {
        this.route.queryParams.subscribe((params) => {
          if (params && params.anchor) {
            const el = document.getElementById('app-home-features');
            if (el) {
              el.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
            }
          }
        });
      }, 1000);
    });
  }


  ngOnInit(): void {
    const wWidth = window.innerWidth;
    if (wWidth > 1200) {
      this.slideHeight = '480px';
      this.maintainAspectRatio = false;
    }
    this.cityData.getCityData().subscribe((res) => {
      this.cityDataCurrent = res;
    });
    this.options = {
        types: [],
        componentRestrictions: { country: 'FR' }
    };


    this.adminService.getCategoryListActive()
      .subscribe((res) => {
        this.categories = res.categories;
      });
    this.restaurantService
      .getAllBusinessesWithOffers()
      .subscribe((res) => {
        if (res.specialOffers && res.specialOffers.length  > 0) {
          this.restaurantsLeft = res.specialOffers.filter((elem, index) => index <= 2);
          this.restaurantsRight = res.specialOffers.filter((elem, index) => index > 2);
          if (wWidth < 1200) {
            this.restaurantsLeft = res.specialOffers;
          }
        }
      });

  }

  ngOnDestroy(): void {

  }

  handleAddressChange(event) {
    if (!!event.formatted_address) {
      this.selectedAddress = event;
    }
  }


  goto() {
      if (this.selectedAddress) {
          const addressComponents = this.selectedAddress.address_components;
          let zipcode = '';
          addressComponents.forEach( (elem) => {
                elem.types.forEach((type) => {
                  if (type === 'postal_code') {
                    zipcode = elem.long_name;
                  }
                });
          });

          const cityDatas1 = {
            formatted: this.selectedAddress.formatted_address,
            name: this.selectedAddress.name,
            city: this.selectedAddress.vicinity,
            zipCode: zipcode
            };

          this.cityData.setCityData(cityDatas1);
          this.router.navigate(['/restaurants-city']);
      }
  }


  goToRestaurantBy(id: any) {
    this.router.navigate([`/restaurant/${id}`]);
  }

  onChangeLocation() {
    const modalRef = this.modal.open(LocationModalComponent);
  }

  onScroll(left?: string) {
    if (left) {
      const el = this.elementRef.nativeElement.querySelector('#ul-carousel-left');
      this.showingLeftPart = true;
      el.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
    } else{
      this.showingLeftPart = false;
      const el = this.elementRef.nativeElement.querySelector('#ul-carousel-right');
      el.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
    }

  }

  onShowCategory(category: CategoryBusiness) {
    this.categoryRestaurantService.setCategorySelected(category);
    this.router.navigate(['category']);
  }

  onScrollResto(event) {
    // const el = document.getElementById('app-home-features');
    setTimeout(() => {
      const el = document.getElementById('section-resto');
      console.warn(el);
      el.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
    }, 100);

  }
}
