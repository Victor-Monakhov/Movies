import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import {HomeRoutingModule} from "./home-routing.module";
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import {HomeContentComponent} from "./components/home-content/home-content.component";
import {HomeContentService} from "../../shared/services/home-content/home-content.service";



@NgModule({
  declarations: [
    HomeComponent,
    HomeHeaderComponent,
    HomeContentComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],

})
export class HomeModule { }
