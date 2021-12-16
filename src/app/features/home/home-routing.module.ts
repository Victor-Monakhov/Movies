import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./components/home.component";
import {RouterModule, Routes} from "@angular/router";
import {NAVIGATE} from "../../app.config";

const routes: Routes = [
  {
    path: NAVIGATE.HOME,
    component: HomeComponent
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
