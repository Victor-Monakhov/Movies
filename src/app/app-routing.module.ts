import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NAVIGATE} from "./app.config";
import {MovieComponent} from "./features/home/components/movie/movie.component";
import {AccountComponent} from "./features/home/components/account/account.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: `/${NAVIGATE.HOME}/1`,
    pathMatch: 'full',
  },
  {
    path: NAVIGATE.HOME,
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: `${NAVIGATE.MOVIE}/:id`,
    component: MovieComponent,
  },
  {
    path: `${NAVIGATE.ACCOUNT}`,
    component: AccountComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
