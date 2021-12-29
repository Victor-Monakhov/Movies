import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRoutingModule} from "./home-routing.module";
import {HomeContentComponent} from "./components/home-content/home-content.component";
import {HomeContentPaginatorComponent} from "./components/home-content-paginator/home-content-paginator.component";
import { MovieComponent } from './components/movie/movie.component';
import { AccountComponent } from './components/account/account.component';



@NgModule({
  declarations: [
    HomeContentComponent,
    HomeContentPaginatorComponent,
    MovieComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],

})
export class HomeModule { }
