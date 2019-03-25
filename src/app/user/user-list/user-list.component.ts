import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../common/models/user';
import { UserService } from '../../shared/services/user.service';
import { CustomMessages } from '../../../assets/config/messagesConfig';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  private userList: User[] = [];
  public filteredUserList: User[] = [];
  public searchText: string;
  private userListSub: Subscription;
  customMessages = CustomMessages;
  @ViewChild('searchTextRef') searchTextRef: ElementRef;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userListSub = this.activatedRoute.data.subscribe(
      response => {
        this.userList = response.userList;
        this.filteredUserList = this.userList;
        this.searchUser();
      },
      error => {
        console.error(this.customMessages.apiCallFailed + error);
      }
    );
  }

  searchUser() {
    fromEvent(this.searchTextRef.nativeElement, 'keyup')
      .pipe(
        map((evt: any) => evt.target.value),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(seachTerm => this.checkValue(seachTerm));
  }

  checkValue(searchText) {
    if (searchText) {
      return this.userService.getUserList(searchText).subscribe(
        response => {
          this.filteredUserList = response;
        },
        error => {
          console.error(this.customMessages.apiCallFailed + error);
        }
      );
    } else {
      this.filteredUserList = this.userList;
    }
  }

  ngOnDestroy() {
    this.userListSub.unsubscribe();
  }
}
