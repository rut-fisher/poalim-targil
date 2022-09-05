// // import { User } from "./user";

// // export class Comment {
// //     id!: number;
// //     parentCommentId?: number;
// //     //ownerId!: number;
// //     owner!: User;
// //     txt!: string;
// //     createdAt!: string
// //     deletedAt?: string
// // }


// //  export class CommentNode extends Comment {
// //     children?: CommentNode[];
// //   }
  

// import { User } from "./user";

// export interface TreeNode {
//   // [key: string]: any // type for unknown keys.
//   // children?: TreeNode[] // type for a known property.
//   children?:  { [id: string]: TreeNode; } // type for a known property.
 
// }

// export class Comment implements TreeNode {
//     id!: number;
//     parentCommentId?: number;
//     //ownerId!: number;
//     owner!: User;
//     txt!: string;
//     createdAt!: string
//     deletedAt?: string
//     // children?: Comment[];
//     children?: { [id: string]: Comment; };
// }






// // import { User } from "./user";

// // export class Comment {
// //     id!: number;
// //     parentCommentId?: number;
// //     //ownerId!: number;
// //     owner!: User;
// //     txt!: string;
// //     createdAt!: string
// //     deletedAt?: string
// // }


// //  export class CommentNode extends Comment {
// //     children?: CommentNode[];
// //   }
  

import { User } from "./user";

export interface TreeNode {
  children?:   TreeNode[] // type for a known property.
 
}

export class Comment implements TreeNode {
    id!: number;
    parentCommentId?: number;
    owner!: User;
    txt!: string;
    createdAt!: string
    deletedAt?: string
    children?: Comment[];
} 


export class SourceComment implements TreeNode {
  id!: number;
  parentCommentId?: number;
  ownerId!: number;
  txt!: string;
  createdAt!: string
  deletedAt?: string
  children?: Comment[];
} 





