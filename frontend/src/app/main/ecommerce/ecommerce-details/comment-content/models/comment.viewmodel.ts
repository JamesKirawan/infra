export class ProductComment {
  commentId: number;
  userId: number;
  productId: number;
  commentText: string;

  constructor(Comment: any = {}) {
    this.commentId = Comment.commentId || 0;
    this.userId = Comment.userId || 0;
    this.productId = Comment.productId || 0;
    this.commentText = Comment.commentText || "";
  }
}