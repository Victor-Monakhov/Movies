import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../../../../shared/models/home-content";
import {filter, map, Observable} from "rxjs";
import {HomeContentService} from "../../../../shared/services/home-content/home-content.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  public currentMovie: Movie | undefined;

  constructor(public contentService: HomeContentService, public activateRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
       this.contentService.movies$?.subscribe( movies =>{
         this.currentMovie = movies?.find(movie => movie.id == params['id']);
      });
    });
  }

}
