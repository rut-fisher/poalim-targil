import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentsPageComponent } from './components/comments-page/comments-page.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { HttpClientModule } from '@angular/common/http';
import { CommentComponent } from './components/comment/comment.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CommentsPageComponent,
    AccountsComponent,
    CommentComponent,
    DateAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
