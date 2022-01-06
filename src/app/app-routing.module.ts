import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NAVIGATE} from "./app.config";
import {MovieComponent} from "./features/movies/components/movie/movie.component";
import {AccountComponent} from "./features/movies/components/account/account.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: `/${NAVIGATE.HOME}/1`,
    pathMatch: 'full',
  },
  {
    path: NAVIGATE.HOME,
    loadChildren: () => import('./features/movies/movies.module').then(m => m.MoviesModule)
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
