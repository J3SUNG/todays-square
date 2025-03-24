import { httpClient } from '../../../shared/lib/http';
import { API_ENDPOINTS } from '../../../shared/config/apiConfig';
import { Comment, CommentFormData } from '../../../entities/comment';

// 댓글 서비스 인터페이스
export interface ICommentService {
  fetchComments(postId: string): Promise<Comment[]>;
  createComment(data: CommentFormData): Promise<Comment>;
  updateComment(id: string, content: string): Promise<Comment>;
  deleteComment(id: string): Promise<void>;
  likeComment(id: string): Promise<{ likes: number }>;
}

// 구체적인 서비스 구현
class CommentService implements ICommentService {
  async fetchComments(postId: string): Promise<Comment[]> {
    return httpClient.get(API_ENDPOINTS.POSTS.COMMENTS(postId));
  }
  
  async createComment(data: CommentFormData): Promise<Comment> {
    return httpClient.post(API_ENDPOINTS.COMMENTS.BASE, data);
  }
  
  async updateComment(id: string, content: string): Promise<Comment> {
    return httpClient.put(API_ENDPOINTS.COMMENTS.GET_BY_ID(id), { content });
  }
  
  async deleteComment(id: string): Promise<void> {
    return httpClient.delete(API_ENDPOINTS.COMMENTS.GET_BY_ID(id));
  }
  
  async likeComment(id: string): Promise<{ likes: number }> {
    return httpClient.post(`${API_ENDPOINTS.COMMENTS.GET_BY_ID(id)}/like`);
  }
}

// 싱글톤 인스턴스 생성
export const commentService = new CommentService();
