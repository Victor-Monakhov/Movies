import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MoviesRoutingModule} from "./movies-routing.module";
import {HomeContentComponent} from "./components/home-content/home-content.component";
import {ContentPaginatorComponent} from "../../shared/components/content-paginator/content-paginator.component";
import {MovieComponent} from './components/movie/movie.component';
import {AccountComponent} from './components/account/account.component';


@NgModule({
  declarations: [
    HomeContentComponent,
    ContentPaginatorComponent,
    MovieComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule
  ],
  providers: []
})
export class MoviesModule {
}
