import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountsService } from '../../services/accounts.service';
import { User } from '../../types/user';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AccountsComponent implements OnInit {
  userList!: Promise<User[]>;  
  constructor(private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.userList = this.accountsService.getAllAccounts();
  }

  onSelectUser(userId: any) {
    this.accountsService.login(userId);
  }

}
