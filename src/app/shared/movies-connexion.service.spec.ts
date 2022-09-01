import { TestBed } from '@angular/core/testing';

import { MoviesConnexionService } from './movies-connexion.service';

describe('MoviesConnexionService', () => {
  let service: MoviesConnexionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesConnexionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
