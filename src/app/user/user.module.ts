import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserResolver } from 'src/app/shared/resolver/user.resolver';

const routes: Routes = [
  {path: '', component: UserListComponent, resolve: {userList : UserResolver}}
];

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: []
})
export class UserModule { }
