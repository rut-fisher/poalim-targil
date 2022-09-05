import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from '../../types/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.less'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment | undefined;
  @Input() readOnly: boolean = true;
  @Input() selected: boolean = false;
  showEditButtons: boolean = false;
  @Output() commentEdited: EventEmitter<any> = new EventEmitter();

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
  }

  deleteComment(event: Event) {
    event.stopPropagation();
    this.comment && this.commentsService.deleteComment(this.comment);
  }

  editComment(event: Event) {
    event.stopPropagation();
    this.commentEdited.emit()
  }
}
