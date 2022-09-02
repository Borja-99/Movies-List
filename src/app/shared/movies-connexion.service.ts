import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesConnexionService {

  constructor(private http: HttpClient) { }

  getMovies(page: number){
    return this.http.get('https://api.themoviedb.org/3/discover/movie?api_key=73a1da8ef5244bbb31a7e367f15f268a&region=ES&page=' + page);
  }

  getMovieDetails(id: number){
    return this.http.get('https://api.themoviedb.org/3/movie/'+id+'&?api_key=73a1da8ef5244bbb31a7e367f15f268a');
  }

  searchMovies(query: string, page: number){
    return this.http.get('https://api.themoviedb.org/3/search/movie?api_key=73a1da8ef5244bbb31a7e367f15f268a&region=ES&query='+query+'&page='+page);
  }
}
