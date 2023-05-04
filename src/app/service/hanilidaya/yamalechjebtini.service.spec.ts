import { TestBed } from '@angular/core/testing';

import { YamalechjebtiniService } from './yamalechjebtini.service';

describe('YamalechjebtiniService', () => {
  let service: YamalechjebtiniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YamalechjebtiniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
