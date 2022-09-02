import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ROUTER_CONFIGURATION } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesConnexionService } from 'src/app/shared/movies-connexion.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  subscription: Subscription | undefined;
  movieIds: number = 0;
  movieDetailsObj: any = {};
  languages: any = [];

  constructor(private moviesConn: MoviesConnexionService, private Aroute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.subscription = this.Aroute.params.subscribe((params: Params)=>{
      this.movieIds = params['movieId'];
    });
    this.moviesConn.getMovieDetails(this.movieIds).subscribe((data)=>{
      this.movieDetailsObj = data;
      this.languages = this.movieDetailsObj.spoken_languages;
    });
  }

  backClick(): void{
    this.route.navigate(['movies-list']);
  }

}
