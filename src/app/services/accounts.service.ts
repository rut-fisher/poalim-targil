import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from '../types/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  selectedUser: User | undefined;
  accountList: User[]=[];

  constructor(private httpClient: HttpClient, private router: Router) { }

  getAllAccounts(): Promise<User[]> {
    return new Promise((res, rej) => {
      if (this.accountList.length) res(this.accountList);
      this.httpClient.get("assets/users.json").subscribe((data: any) => {
        this.accountList = data;        
       return res(this.accountList)
      })
    })

  }

  login(userId: number) {
    this.selectedUser = this.accountList.find(user => user.id == userId);
    this.router.navigate(["/comments"])
  }

  getUserAccountById(userId: number): User | undefined {
    return this.accountList?.find(account => account.id == userId)
  }
}
