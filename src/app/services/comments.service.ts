import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment, TreeNode, SourceComment } from '../types/comment';
import _ from "lodash"
import { AccountsService } from './accounts.service';
import { binarySearch } from './helper';
import { StorageService } from './storage.service';
import { STORAGE_COMMENTS_KEY } from '../const';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  commentsTree: Comment[] | undefined;
  nextId: number = 0;
  sourceCommentsData: SourceComment[] = [];

  constructor(private httpClient: HttpClient, private accountService: AccountsService, private storageService: StorageService) { }

  transformToTree(arr: any[]): Comment[] {
    var nodes: any = {};
    return arr.filter((comment: any) => {
      var id = comment.id,
        parentId = comment.parentCommentId;
      comment.owner = this.accountService.getUserAccountById(comment.ownerId)
      nodes[id] = _.defaults(comment, nodes[id], { children: [] });
      parentId && (nodes[parentId] = (nodes[parentId] || { children: [] }))["children"].push(comment);
      return !parentId;
    });
  }

  sortCommentsByDate(arr: Comment[]) {
    return arr ? _.sortBy(arr, (dateObj) => {
      return new Date(dateObj.createdAt);
    }) : arr;
  }


  getAllComments() {
    return new Promise((res, rej) => {
      if (this.commentsTree) res(this.commentsTree);
      var storageCommentsData = this.storageService.get(STORAGE_COMMENTS_KEY)
      if(storageCommentsData) {
        this.onGetCommentsData(JSON.parse(storageCommentsData));
        res(this.commentsTree);
        return;
      }
      this.httpClient.get("assets/comments.json").subscribe((data: any) => {
        this.onGetCommentsData(data);
        res(this.commentsTree);
      });
    })
  }

  onGetCommentsData(data:any){
    this.sourceCommentsData = _.sortBy(data.map((x:any) => Object.assign({}, x)), "id");
    var maxItem: any = _.maxBy(data, 'id');
    this.nextId = (maxItem && maxItem.id || 0) + 1
    this.commentsTree = this.transformToTree(this.sortCommentsByDate(data))
  }


  deleteComment(comment: Comment) {
    comment.deletedAt = new Date().toISOString();
    this.editSourceCommentAndSaveInStorage(comment);
    comment.children?.forEach((comment: Comment) => {
      comment.deletedAt = new Date().toISOString();
      this.editSourceCommentAndSaveInStorage(comment);
    })
  }


  editComment(comment: Comment, newTxt: string) {
    comment.txt = newTxt;
    comment.createdAt = new Date().toISOString();
    this.editSourceCommentAndSaveInStorage(comment);
  }


  addComment(newComment: Comment) {
    newComment.id = this.nextId++;
    if (newComment.parentCommentId) {
      var parentNode = this.searchNode({ children: this.commentsTree }, newComment.parentCommentId)
      parentNode && parentNode.children?.push(newComment);
    } else {
      this.commentsTree?.push(newComment);
    }
    this.AddSourceCommentAndSaveInStorage(newComment);
  }


  searchNode(node: Partial<Comment>, matchNodeId: number): Partial<Comment> | Comment | null {
    if (!node || node.id == matchNodeId) return node;
    if (node.children != null) {
      var i;
      var result: Comment | null | Partial<Comment> = null;
      for (i = 0; result == null && i < node.children.length; i++) {
        result = this.searchNode(node.children[i], matchNodeId);
      }
      return result;
    }
    return null;
  }

  transferToSourceComment(comment: Comment): SourceComment {
    return {
      id: comment.id,
      parentCommentId: comment.parentCommentId,
      ownerId: comment.owner.id,
      txt: comment.txt,
      createdAt: comment.createdAt,
      deletedAt: comment.deletedAt,
    }
  }

  editSourceCommentAndSaveInStorage(comment: Comment) {
    var index = binarySearch(this.sourceCommentsData, "id", comment.id);
    index > -1 && (this.sourceCommentsData[index] = this.transferToSourceComment(comment));
    this.storageService.set(STORAGE_COMMENTS_KEY, JSON.stringify(this.sourceCommentsData));
  }

  AddSourceCommentAndSaveInStorage(comment: Comment) {
    this.sourceCommentsData.push(this.transferToSourceComment(comment));
    this.storageService.set(STORAGE_COMMENTS_KEY, JSON.stringify(this.sourceCommentsData));
  }
}



