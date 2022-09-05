import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../types/comment';
import { User } from '../../types/user';
import _ from "lodash"


@Component({
  selector: 'app-comments-page',
  templateUrl: './comments-page.component.html',
  styleUrls: ['./comments-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CommentsPageComponent implements OnInit {
  commentsTree: Comment[] = [];
  selectedUser: User | undefined;
  newComment: Partial<Comment> = { txt: "" };
  editMode: boolean = false
  editComment: Comment | undefined;

  constructor(private commentsService: CommentsService, private accountsService: AccountsService) { }


  ngOnInit(): void {
    this.commentsService.getAllComments().then((data: any) => {
      this.commentsTree = data;
    })
    this.selectedUser = this.accountsService.selectedUser;
  }

  addNewComment() {
    if (this.selectedUser && this.newComment.txt) {
      const c: Comment = {
        id: -1,
        parentCommentId: this.newComment.parentCommentId,
        owner: this.selectedUser,
        txt: this.newComment.txt,
        createdAt: new Date().toISOString(),
        children: []
      }
      this.commentsService.addComment(c);
      this.newComment.txt = "";
    }
  }

  onSubmit(){
    if(this.editMode){
      this.editComment && (this.commentsService.editComment(this.editComment, this.newComment.txt || ""))
      this.cancelEditMode();
    } else {
      this.addNewComment();
    }
  }

  onCommentSelected(event: Event, comment: Comment) {
    this.newComment.parentCommentId = comment.id
    event.stopPropagation();
  }

  onEditComment(comment: Comment) {
    this.editComment = comment;
    this.newComment.txt = comment.txt;
    this.newComment.parentCommentId = undefined;
    this.editMode = true;
  }

  cancelEditMode(){
    this.newComment.txt = "";
    this.editMode = false;
  }
}
