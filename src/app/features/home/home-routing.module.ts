import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NAVIGATE} from "../../app.config";
import {HomeContentComponent} from "./components/home-content/home-content.component";
import {MovieComponent} from "./components/movie/movie.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/list/1',
    pathMatch: 'full',
  },
  {
    path: ':page',
    component: HomeContentComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
