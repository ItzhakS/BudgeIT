import { TestBed, inject } from '@angular/core/testing';

import { SaveDataService } from './saveData.service';

describe('SaveataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveDataService]
    });
  });

  it('should be created', inject([SaveDataService], (service: SaveDataService) => {
    expect(service).toBeTruthy();
  }));
});
