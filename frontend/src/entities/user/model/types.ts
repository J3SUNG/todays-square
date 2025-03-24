// 사용자 엔티티 타입 정의
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
}

export interface UserProfile extends User {
  postsCount: number;
  commentsCount: number;
}
