// 게시물 엔티티 타입 정의
// 여러 계층에서 사용될 수 있는 도메인 모델

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  commentsCount: number;
  likes: number;
}

export interface PostPreview {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  commentsCount: number;
  likes: number;
}

export interface PostFormData {
  title: string;
  content: string;
}

export type PostSortOption = 'latest' | 'popular' | 'comments';

export interface PostsFilter {
  authorId?: string;
  sortBy: PostSortOption;
  page: number;
  limit: number;
}
