import { create } from 'zustand';
import { Comment } from './types';

// 댓글 상태 인터페이스
interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  
  // 액션 인터페이스
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  updateComment: (id: string, content: string) => void;
  removeComment: (id: string) => void;
  setLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  resetState: () => void;
}

// Zustand 스토어 생성
export const useCommentsStore = create<CommentsState>((set) => ({
  comments: [],
  loading: false,
  error: null,
  
  // 메서드 구현
  setComments: (comments) => set({ comments }),
  addComment: (comment) => set((state) => ({
    comments: [comment, ...state.comments]
  })),
  updateComment: (id, content) => set((state) => ({
    comments: state.comments.map(comment => 
      comment.id === id ? { ...comment, content } : comment
    )
  })),
  removeComment: (id) => set((state) => ({
    comments: state.comments.filter(comment => comment.id !== id)
  })),
  setLoading: (status) => set({ loading: status }),
  setError: (error) => set({ error }),
  resetState: () => set({
    comments: [],
    loading: false,
    error: null
  })
}));
