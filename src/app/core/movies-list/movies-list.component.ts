import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesConnexionService } from 'src/app/shared/movies-connexion.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})

export class MoviesListComponent implements OnInit {

  moviesObject: any = {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0
  };
  moviesListTitles: any = [];
  page: number = 1;
  PreviousEditMode: boolean = false;
  NextEditMode: boolean = true;
  @Output() movieId: number|undefined;

  constructor(private moviesConn: MoviesConnexionService, private route: Router) { }

  ngOnInit(): void {
    this.showTitleMoviesList();
  }

  showTitleMoviesList(): void {
    this.moviesConn.getMovies(this.page).subscribe((data)=>{
      this.moviesObject = data;
      this.moviesListTitles = this.moviesObject.results;
      this.page = this.moviesObject.page
    });
  }

  onSearch(): void {
    let movieSearchList = [];
    let input = document.getElementById('inputText')
    
    for(let i = 0; i < this.moviesListTitles.length; i++){
      if(this.moviesListTitles[i].original_title.includes(input)){
        movieSearchList.push(this.moviesListTitles[i]);
      }
    }
    this.moviesListTitles = movieSearchList;
  }

  onDetail(id:number): void {
    this.movieId = id;
    this.route.navigate(['movie-details']);
  }
  
  onNextButton(): void { // DataBase only allows to call first 500 pages of the total
    if(this.page < 500 && this.page >= 1){ 
      this.PreviousEditMode = true;
      this.page = this.page + 1;
      console.log(this.page);
      this.moviesConn.getMovies(this.page).subscribe((data) =>{
        this.moviesObject = data;
        this.moviesListTitles = this.moviesObject.results;
      });
      if(this.page === 500){this.NextEditMode = false;} 
    }
  }

  onPreviousButton(): void {
    if(this.page > 1 && this.page <= 500){
      this.NextEditMode = true;
      this.page = this.page - 1 ;
    this.moviesConn.getMovies(this.page).subscribe((data) =>{
      this.moviesObject = data;
      this.moviesListTitles = this.moviesObject.results;
    });
    if(this.page === 1){this.PreviousEditMode = false;}
    }
  }
}

