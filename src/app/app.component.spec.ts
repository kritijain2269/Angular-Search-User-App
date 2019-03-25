import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { HomeService } from './shared/services/home.service';
import { from, throwError } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let homeService: HomeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [HomeService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    homeService = new HomeService(null);
    component = new AppComponent(homeService);
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  }));

  it('should return a jwt token', () => {
    const token = 'test_token';
    spyOn(homeService, 'getJwtToken').and.callFake(() => {
      return from([token]);
    });
    component.ngOnInit();
    expect(localStorage.getItem('token')).toBeDefined();
  });

  it('should check if server returns an error while generating a jwt token', () => {
    spyOn(homeService , 'getJwtToken').and.callFake(() => {
      return throwError('Fake error');
    });
    component.ngOnInit();
    expect(homeService.getJwtToken().subscribe(res => res, err => {
      expect(err).toEqual('Fake error');
    }));
  });

  it('should check local storage is cleared when user logs out', () => {
    component.Logout();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
