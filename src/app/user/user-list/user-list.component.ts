import { Component, OnInit } from '@angular/core';
import { User } from '../../common/models/user';
import { UserService } from '../../shared/services/user.service';
import { CustomMessages } from '../../../assets/config/messagesConfig';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  private userList: User[] = [];
  private filteredUserList: User[] = [];
  private searchText: string;
  private userListSub: Subscription;
  customMessages = CustomMessages;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userListSub = this.activatedRoute.data.subscribe(
      response => {
        this.userList = response.userList;
        this.filteredUserList = this.userList;
      },
      error => {
        console.error(this.customMessages.apiCallFailed);
      }
    );
  }

  SearchUser(): void {
    this.userListSub = this.userService.getUserList(this.searchText).subscribe(data => {
      this.filteredUserList = data;
    },
    error => {
      console.error(this.customMessages.apiCallFailed);
    });
  }

  ngOnDestroy() {
    this.userListSub.unsubscribe();
  }
}
