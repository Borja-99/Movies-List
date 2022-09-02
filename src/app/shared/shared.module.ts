import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MoviesConnexionService } from './movies-connexion.service';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MovieDetailsRoutingModule } from '../core/movie-details/movie-details-routing.module';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    MovieDetailsRoutingModule,
    MatIconModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [MoviesConnexionService],
  bootstrap: [],
})
export class SharedModule {}
