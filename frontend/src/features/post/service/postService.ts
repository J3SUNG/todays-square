import { httpClient } from '../../../shared/lib/http';
import { API_ENDPOINTS } from '../../../shared/config/apiConfig';
import { Post, PostPreview, PostFormData, PostsFilter } from '../../../entities/post';

// SOLID의 Interface Segregation Principle 적용
// 하나의 큰 인터페이스보다 목적별로 분리된 인터페이스 설계

// 게시물 서비스 인터페이스
export interface IPostService {
  fetchPosts(filter: PostsFilter): Promise<{ posts: PostPreview[], total: number }>;
  fetchPostById(id: string): Promise<Post>;
  createPost(data: PostFormData): Promise<Post>;
  updatePost(id: string, data: PostFormData): Promise<Post>;
  deletePost(id: string): Promise<void>;
  likePost(id: string): Promise<{ likes: number }>;
}

// 구체적인 서비스 구현 (Dependency Inversion Principle)
class PostService implements IPostService {
  async fetchPosts(filter: PostsFilter): Promise<{ posts: PostPreview[], total: number }> {
    const { sortBy, page, limit, authorId } = filter;
    let url = `${API_ENDPOINTS.POSTS.BASE}?sortBy=${sortBy}&page=${page}&limit=${limit}`;
    
    if (authorId) {
      url += `&authorId=${authorId}`;
    }
    
    return httpClient.get(url);
  }
  
  async fetchPostById(id: string): Promise<Post> {
    return httpClient.get(API_ENDPOINTS.POSTS.GET_BY_ID(id));
  }
  
  async createPost(data: PostFormData): Promise<Post> {
    return httpClient.post(API_ENDPOINTS.POSTS.BASE, data);
  }
  
  async updatePost(id: string, data: PostFormData): Promise<Post> {
    return httpClient.put(API_ENDPOINTS.POSTS.GET_BY_ID(id), data);
  }
  
  async deletePost(id: string): Promise<void> {
    return httpClient.delete(API_ENDPOINTS.POSTS.GET_BY_ID(id));
  }
  
  async likePost(id: string): Promise<{ likes: number }> {
    return httpClient.post(`${API_ENDPOINTS.POSTS.GET_BY_ID(id)}/like`);
  }
}

// 싱글톤 인스턴스 생성
export const postService = new PostService();
