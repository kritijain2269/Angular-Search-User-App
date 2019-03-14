import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router/src/router_state';

describe('UserListComponent', () => {
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [UserService]
    })
    .compileComponents();
  }));

  it('should create the app', async(() => {
    fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
