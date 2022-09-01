import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MoviesConnexionService } from './movies-connexion.service';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    MatInputModule,
    MatCardModule
  ],
  providers: [MoviesConnexionService],
  bootstrap: [],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
