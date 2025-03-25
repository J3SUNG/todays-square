// 댓글 엔티티 타입 정의
export interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  postId: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  replies?: Comment[];
}

export interface CommentFormData {
  content: string;
  postId: string;
  parentId?: string;
}
