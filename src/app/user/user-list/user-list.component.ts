import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/_models/user';
import { UserService } from '../../shared/_services/user.service';
import { CustomMessages } from '../../../assets/config/messagesConfig';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private userList: User[] = [];
  private filteredUserList: User[] = [];
  private SearchText: string;
  customMessages = CustomMessages;

  get searchText(): string {
    return this.SearchText;
  }
  set searchText(value: string) {
    this.SearchText = value;
    this.filteredUserList = this.SearchText
      ? this.getFilteredUserList(this.SearchText)
      : this.userList;
  }

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      response => {
        this.userList = response.userList;
        this.filteredUserList = this.userList;
      },
      error => {
        console.error(this.customMessages.apiCallFailed);
      }
    );
  }

  getFilteredUserList(searchText): User[] {
    searchText = searchText.toLowerCase();
    return this.filteredUserList = this.userService.getUserList(searchText).subscribe(data => {
      return this.filteredUserList = data;
      console.log(data);
    });
    // return this.filteredUserList;
  }
}
