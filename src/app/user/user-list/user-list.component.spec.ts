import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { from, of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('UserListComponent', () => {
  let userService: UserService;
  let fixture: ComponentFixture<UserListComponent>;
  let component: UserListComponent;
  const route = ({ data: of({userList: [{ name: 'hello' }]}) } as any) as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [UserService, { provide: ActivatedRoute, useValue: route }],
    }).compileComponents().then(() => {
    fixture = TestBed.createComponent(UserListComponent);
    userService = new UserService(null);
    component = new UserListComponent(userService, route);
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.value = '';
    fixture.nativeElement = input;
    fixture.detectChanges();
    });
  }));

  it('should get all user list and display it', async(() => {
    spyOn(component, 'searchUser').and.callFake(() => {
      return from([]);
    });
    component.ngOnInit();
    expect(component.filteredUserList.length).toEqual(1);
  }));

  it('should search a user whose name starts with the search term provided', fakeAsync(() => {
    const userList = [{name : 'ABC'}, {name : 'DEF'}];
    component.searchText = 'A';
    const spy = spyOn(userService, 'getUserList').and.callFake((searchText) => {
      return from([userList.filter(x => x.name === searchText)]);
    });
    component.checkValue(component.searchText);
    tick(5000);
    expect(spy).toHaveBeenCalledWith(component.searchText);
  }));

  it('should check if server returns an error while fetching user list', () => {
    spyOn(userService , 'getUserList').and.callFake(() => {
      return throwError('Fake error');
    });
    component.checkValue('');
    expect(userService.getUserList('').subscribe(res => res, err => {
      expect(err).toEqual('Fake error');
    }));
  });
});
