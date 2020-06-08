import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeFeaturesComponent } from './home/home-features/home-features.component';
import { CardComponent } from './home/home-features/card/card.component';
import { FooterComponent } from './footer/footer.component';
import {CoreModule} from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HomeFeaturesComponent,
    CardComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [CoreModule, HomeComponent, NavbarComponent]
})
export class AppModule { }
