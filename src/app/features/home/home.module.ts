import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import {HomeRoutingModule} from "./home-routing.module";
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import {HomeContentComponent} from "./components/home-content/home-content.component";
import {HomeContentPaginatorComponent} from "./components/home-content-paginator/home-content-paginator.component";



@NgModule({
  declarations: [
    HomeComponent,
    HomeHeaderComponent,
    HomeContentComponent,
    HomeContentPaginatorComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],

})
export class HomeModule { }
