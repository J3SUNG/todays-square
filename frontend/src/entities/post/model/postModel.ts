import { create } from 'zustand';
import { Post, PostPreview, PostsFilter } from './types';

// 상태 인터페이스 - OOP의 캡슐화 원칙 적용
interface PostsState {
  posts: PostPreview[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
  filters: PostsFilter;
  totalPosts: number;
  
  // 액션 인터페이스 (메서드 정의)
  setPosts: (posts: PostPreview[]) => void;
  setCurrentPost: (post: Post | null) => void;
  setLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<PostsFilter>) => void;
  setTotalPosts: (count: number) => void;
  resetState: () => void;
}

// 초기 필터 상태
const initialFilters: PostsFilter = {
  sortBy: 'latest',
  page: 1,
  limit: 10
};

// Zustand 스토어 생성 - 상태 관리 캡슐화
export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  filters: initialFilters,
  totalPosts: 0,
  
  // 메서드 구현
  setPosts: (posts) => set({ posts }),
  setCurrentPost: (post) => set({ currentPost: post }),
  setLoading: (status) => set({ loading: status }),
  setError: (error) => set({ error }),
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),
  setTotalPosts: (count) => set({ totalPosts: count }),
  resetState: () => set({
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
    filters: initialFilters,
    totalPosts: 0
  })
}));
