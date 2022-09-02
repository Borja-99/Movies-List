import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
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
  moviesListAux: any = [];
  page: number = 1;
  PreviousEditMode: boolean = false;
  NextEditMode: boolean = true;
  movieId: number | undefined;
  query: string = '';

  constructor(private moviesConn: MoviesConnexionService, private route: Router) { }

  ngOnInit(): void {
    this.showTitleMoviesList();
  }

  showTitleMoviesList(): void {
    this.moviesConn.getMovies(1).subscribe((data)=>{
      this.moviesObject = data;
      this.moviesListTitles = this.moviesListAux = this.moviesObject.results;
      this.page = this.moviesObject.page
    });
  }

  onSearch(): void {
    let input = (<HTMLInputElement>document.getElementById("inputText")).value;
    this.query = input
    if(input === ''){
      this.page = 1;
      this.moviesListTitles = this.moviesListAux;
    }else{
      this.moviesConn.searchMovies(input, 1).subscribe((data)=> {
        this.moviesObject = data;
        this.moviesListTitles = this.moviesObject.results;
        this.page = this.moviesObject.page
        console.log(this.moviesObject.total_pages);
        if(this.moviesObject.total_pages <= 1 ){ this.NextEditMode = false; }
      });
    }
    this.NextEditMode = true;
    this.PreviousEditMode = false;
  }

  onDetail(id:number): void {
    this.movieId = id;
    this.route.navigate(['movie-details', this.movieId]);
  }
  
  onNextButton(): void {
    if(this.query === ''){
      if(this.page < 1000 && this.page >= 1){ 
        this.PreviousEditMode = true;
        this.page = this.page + 1;
        this.moviesConn.getMovies(this.page).subscribe((data) =>{
          this.moviesObject = data;
          this.moviesListTitles = this.moviesObject.results;
        });
        if(this.page === this.moviesObject.total_pages){this.NextEditMode = false;} 
      }
    }else{
      if(this.page < this.moviesObject.total_pages && this.page >= 1){ 
        this.PreviousEditMode = true;
        this.page = this.page + 1;
        this.moviesConn.searchMovies(this.query, this.page).subscribe((data) =>{
          this.moviesObject = data;
          this.moviesListTitles = this.moviesObject.results;
        });
        if(this.page === this.moviesObject.total_pages){this.NextEditMode = false;} 
      }
    }
  }

  onPreviousButton(): void {
    if(this.query === ''){
      if(this.page > 1 && this.page <= 1000){ 
        this.NextEditMode = true;
        this.page = this.page - 1;
        this.moviesConn.getMovies(this.page).subscribe((data) =>{
          this.moviesObject = data;
          this.moviesListTitles = this.moviesObject.results;
        });
        if(this.page === 1){this.PreviousEditMode = false;} 
      }
    }else{
      if(this.page <= this.moviesObject.total_pages && this.page >= 1){ 
        this.NextEditMode = true;
        this.page = this.page - 1;
        this.moviesConn.searchMovies(this.query, this.page).subscribe((data) =>{
          this.moviesObject = data;
          this.moviesListTitles = this.moviesObject.results;
        });
        if(this.page === 1){this.PreviousEditMode = false;} 
      }
    }
  }
}