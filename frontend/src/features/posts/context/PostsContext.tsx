import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { http } from '../../../shared/lib/http';
import { API_ENDPOINTS } from '../../../shared/config/apiConfig';
import { toast } from 'react-toastify';

// 게시물 타입 정의
export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  commentsCount: number;
  likes: number;
};

// 게시물 목록 필터 타입
export type PostFilter = {
  page: number;
  limit: number;
  sortBy: 'latest' | 'popular' | 'comments';
  authorId?: string;
};

// 게시물 폼 데이터 타입
export type PostFormData = {
  title: string;
  content: string;
};

// 상태 타입 정의
type PostsState = {
  posts: Post[];
  currentPost: Post | null;
  isLoading: boolean;
  error: string | null;
  totalPosts: number;
  filter: PostFilter;
};

// 액션 타입 정의
type PostsActions = {
  fetchPosts: (newFilter?: Partial<PostFilter>) => Promise<void>;
  fetchPost: (id: string) => Promise<Post | null>;
  createPost: (data: PostFormData) => Promise<Post>;
  updatePost: (id: string, data: PostFormData) => Promise<Post>;
  deletePost: (id: string) => Promise<boolean>;
  likePost: (id: string) => Promise<number>;
  setFilter: (newFilter: Partial<PostFilter>) => void;
};

// Context 타입 정의
type PostsContextType = PostsState & PostsActions;

// Context 생성
const PostsContext = createContext<PostsContextType | undefined>(undefined);

// 초기 필터 설정
const initialFilter: PostFilter = {
  page: 1,
  limit: 10,
  sortBy: 'latest',
};

// Provider 컴포넌트 props 타입
type PostsProviderProps = {
  children: ReactNode;
};

// Provider 컴포넌트
export const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
  // 상태 정의
  const [state, setState] = useState<PostsState>({
    posts: [],
    currentPost: null,
    isLoading: false,
    error: null,
    totalPosts: 0,
    filter: initialFilter,
  });

  // 게시물 목록 조회
  const fetchPosts = async (newFilter?: Partial<PostFilter>) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    // 필터 업데이트
    const updatedFilter = newFilter 
      ? { ...state.filter, ...newFilter }
      : state.filter;
    
    try {
      // API 요청 URL 구성
      const url = API_ENDPOINTS.POSTS.BASE;
      const params = {
        page: updatedFilter.page,
        limit: updatedFilter.limit,
        sortBy: updatedFilter.sortBy,
        ...(updatedFilter.authorId && { authorId: updatedFilter.authorId }),
      };
      
      // 게시물 목록 조회
      const { posts, total } = await http.get<{ posts: Post[], total: number }>(url, params);
      
      setState(prev => ({
        ...prev,
        posts,
        totalPosts: total,
        isLoading: false,
        filter: updatedFilter,
      }));
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '게시물을 불러오는데 실패했습니다.';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage,
      }));
      toast.error(errorMessage);
    }
  };

  // 단일 게시물 조회
  const fetchPost = async (id: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const post = await http.get<Post>(API_ENDPOINTS.POSTS.DETAIL(id));
      setState(prev => ({
        ...prev,
        currentPost: post,
        isLoading: false,
      }));
      return post;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '게시물을 불러오는데 실패했습니다.';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage,
      }));
      toast.error(errorMessage);
      return null;
    }
  };

  // 게시물 생성
  const createPost = async (data: PostFormData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const post = await http.post<Post>(API_ENDPOINTS.POSTS.BASE, data);
      
      // 목록 갱신 (최신순일 경우)
      if (state.filter.sortBy === 'latest') {
        setState(prev => ({
          ...prev,
          posts: [post, ...prev.posts],
          isLoading: false,
          totalPosts: prev.totalPosts + 1,
        }));
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          totalPosts: prev.totalPosts + 1,
        }));
      }
      
      toast.success('게시물이 작성되었습니다.');
      return post;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '게시물 작성에 실패했습니다.';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage,
      }));
      toast.error(errorMessage);
      throw error;
    }
  };

  // 게시물 수정
  const updatePost = async (id: string, data: PostFormData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const post = await http.put<Post>(API_ENDPOINTS.POSTS.DETAIL(id), data);
      
      // 현재 보고 있는 게시물 및 목록 업데이트
      setState(prev => ({
        ...prev,
        currentPost: post,
        posts: prev.posts.map(p => p.id === id ? post : p),
        isLoading: false,
      }));
      
      toast.success('게시물이 수정되었습니다.');
      return post;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '게시물 수정에 실패했습니다.';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage,
      }));
      toast.error(errorMessage);
      throw error;
    }
  };

  // 게시물 삭제
  const deletePost = async (id: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await http.delete(API_ENDPOINTS.POSTS.DETAIL(id));
      
      // 목록에서 제거
      setState(prev => ({
        ...prev,
        posts: prev.posts.filter(p => p.id !== id),
        currentPost: null,
        isLoading: false,
        totalPosts: prev.totalPosts - 1,
      }));
      
      toast.success('게시물이 삭제되었습니다.');
      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '게시물 삭제에 실패했습니다.';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage,
      }));
      toast.error(errorMessage);
      return false;
    }
  };

  // 게시물 좋아요
  const likePost = async (id: string) => {
    try {
      const { likes } = await http.post<{ likes: number }>(API_ENDPOINTS.POSTS.LIKE(id));
      
      // 현재 보고 있는 게시물 및 목록 업데이트
      setState(prev => ({
        ...prev,
        currentPost: prev.currentPost && prev.currentPost.id === id
          ? { ...prev.currentPost, likes }
          : prev.currentPost,
        posts: prev.posts.map(p => p.id === id ? { ...p, likes } : p),
      }));
      
      return likes;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '좋아요에 실패했습니다.';
      toast.error(errorMessage);
      throw error;
    }
  };

  // 필터 설정
  const setFilter = (newFilter: Partial<PostFilter>) => {
    setState(prev => ({
      ...prev,
      filter: { ...prev.filter, ...newFilter },
    }));
  };

  // 필터 변경 시 자동으로 게시물 목록 갱신
  useEffect(() => {
    fetchPosts();
  }, [state.filter.page, state.filter.sortBy]);

  // Context 값
  const value = {
    ...state,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    likePost,
    setFilter,
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};

// Custom Hook
export const usePosts = () => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};
