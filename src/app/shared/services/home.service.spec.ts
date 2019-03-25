import { TestBed, getTestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import { from } from 'rxjs';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeService', () => {
  let injector: TestBed;
  let service: HomeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService]
    });
    injector = getTestBed();
    service = injector.get(HomeService);
    httpMock = injector.get(HttpTestingController);
  });


  it('should generate jwt token', () => {
    const token = { token: 'token' };
    service.getJwtToken().subscribe(response => {
      expect(response).toEqual(token);
    });

    const req = httpMock.expectOne('https://localhost:3000/');
    expect(req.request.method).toBe('GET');
    req.flush(token);
  });

});
