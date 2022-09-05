import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AuthGuard } from './auth.guard';
import { CommentsPageComponent } from './components/comments-page/comments-page.component';

const routes: Routes =  [
  { path: '', redirectTo: 'accounts', pathMatch: 'full' },
  { path: 'accounts', component: AccountsComponent },
  {
    path: 'comments', component: CommentsPageComponent,
    canActivate: [AuthGuard]
  }
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
