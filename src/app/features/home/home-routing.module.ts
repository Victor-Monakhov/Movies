import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeContentComponent} from "./components/home-content/home-content.component";

const routes: Routes = [
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
