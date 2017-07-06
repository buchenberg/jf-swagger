import { TestBed, inject } from '@angular/core/testing';

import { PetstoreService } from './petstore.service';

describe('PetstoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PetstoreService]
    });
  });

  it('should ...', inject([PetstoreService], (service: PetstoreService) => {
    expect(service).toBeTruthy();
  }));
});
