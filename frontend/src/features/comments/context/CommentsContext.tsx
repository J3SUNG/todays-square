import React, { createContext, useContext, useState, ReactNode } from 'react';
import { http } from '../../../shared/lib/http';
import { API_ENDPOINTS } from '../../../shared/config/apiConfig';
import { toast } from 'react-toastify';

// 댓글 타입 정의
export type Comment = {
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
};

// 댓글 폼 데이터 타입
export type CommentFormData = {
  content: string;
  postId: string;
  parentId?: string;
};

// 상태 타입 정의
type CommentsState = {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
};

// 액션 타입 정의
type CommentsActions = {
  fetchComments: (postId: string) => Promise<void>;
  createComment: (data: CommentFormData) => Promise<Comment>;
  updateComment: (id: string, content: string) => Promise<boolean>;
  deleteComment: (id: string) => Promise<boolean>;
  likeComment: (id: string) => Promise<number>;
};

// Context 타입 정의
type CommentsContextType = CommentsState & CommentsActions;

// Context 생성
const CommentsContext = createContext<CommentsContextType | undefined>(undefined);

// Provider 컴포넌트 props 타입
type CommentsProviderProps = {
  children: ReactNode;
};

// Provider 컴포넌트
export const CommentsProvider: React.FC<CommentsProviderProps> = ({ children }) => {
  // 상태 정의
  const [state, setState] = useState<CommentsState>({
    comments: [],
    isLoading: false,
    error: null,
  });

  // 댓글 목록 조회
  const fetchComments = async (postId: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const comments = await http.get<Comment[]>(API_ENDPOINTS.POSTS.COMMENTS(postId));
      
      // 댓글 계층 구조 생성 (replies 정리)
      const commentMap = new Map<string, Comment>();
      const rootComments: Comment[] = [];
      
      // 모든 댓글을 맵에 추가
      comments.forEach(comment => {
        commentMap.set(comment.id, { ...comment, replies: [] });
      });
      
      // 계층 구조 구성
      comments.forEach(comment => {
        const currentComment = commentMap.get(comment.id)!;
        
        if (comment.parentId) {
          // 답글인 경우
          const parentComment = commentMap.get(comment.parentId);
          if (parentComment) {
            parentComment.replies = parentComment.replies || [];
            parentComment.replies.push(currentComment);
          } else {
            rootComments.push(currentComment);
          }
        } else {
          // 최상위 댓글인 경우
          rootComments.push(currentComment);
        }
      });
      
      setState({
        comments: rootComments,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '댓글을 불러오는데 실패했습니다.';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage,
      }));
      toast.error(errorMessage);
    }
  };

  // 댓글 생성
  const createComment = async (data: CommentFormData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const newComment = await http.post<Comment>(API_ENDPOINTS.COMMENTS.BASE, data);
      
      // 댓글 목록 업데이트
      setState(prev => {
        // 새 댓글이 답글인 경우
        if (data.parentId) {
          return {
            ...prev,
            comments: prev.comments.map(comment => {
              if (comment.id === data.parentId) {
                return {
                  ...comment,
                  replies: [...(comment.replies || []), newComment],
                };
              }
              return comment;
            }),
            isLoading: false,
          };
        }
        
        // 새 댓글이 최상위 댓글인 경우
        return {
          ...prev,
          comments: [newComment, ...prev.comments],
          isLoading: false,
        };
      });
      
      toast.success('댓글이 작성되었습니다.');
      return newComment;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '댓글 작성에 실패했습니다.';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage,
      }));
      toast.error(errorMessage);
      throw error;
    }
  };

  // 댓글 수정
  const updateComment = async (id: string, content: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await http.put(API_ENDPOINTS.COMMENTS.DETAIL(id), { content });
      
      // 댓글 목록 업데이트
      setState(prev => {
        const updateCommentInList = (comments: Comment[]): Comment[] => {
          return comments.map(comment => {
            if (comment.id === id) {
              return { ...comment, content };
            }
            if (comment.replies) {
              return { 
                ...comment, 
                replies: updateCommentInList(comment.replies)
              };
            }
            return comment;
          });
        };
        
        return {
          ...prev,
          comments: updateCommentInList(prev.comments),
          isLoading: false,
        };
      });
      
      toast.success('댓글이 수정되었습니다.');
      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '댓글 수정에 실패했습니다.';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage,
      }));
      toast.error(errorMessage);
      return false;
    }
  };

  // 댓글 삭제
  const deleteComment = async (id: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await http.delete(API_ENDPOINTS.COMMENTS.DETAIL(id));
      
      // 댓글 목록 업데이트
      setState(prev => {
        const filterComments = (comments: Comment[]): Comment[] => {
          return comments
            .filter(comment => comment.id !== id)
            .map(comment => {
              if (comment.replies) {
                return {
                  ...comment,
                  replies: filterComments(comment.replies),
                };
              }
              return comment;
            });
        };
        
        return {
          ...prev,
          comments: filterComments(prev.comments),
          isLoading: false,
        };
      });
      
      toast.success('댓글이 삭제되었습니다.');
      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '댓글 삭제에 실패했습니다.';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage,
      }));
      toast.error(errorMessage);
      return false;
    }
  };

  // 댓글 좋아요
  const likeComment = async (id: string) => {
    try {
      const { likes } = await http.post<{ likes: number }>(API_ENDPOINTS.COMMENTS.LIKE(id));
      
      // 댓글 목록 업데이트
      setState(prev => {
        const updateLikes = (comments: Comment[]): Comment[] => {
          return comments.map(comment => {
            if (comment.id === id) {
              return { ...comment, likes };
            }
            if (comment.replies) {
              return { 
                ...comment, 
                replies: updateLikes(comment.replies)
              };
            }
            return comment;
          });
        };
        
        return {
          ...prev,
          comments: updateLikes(prev.comments),
        };
      });
      
      return likes;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '좋아요에 실패했습니다.';
      toast.error(errorMessage);
      throw error;
    }
  };

  // Context 값
  const value = {
    ...state,
    fetchComments,
    createComment,
    updateComment,
    deleteComment,
    likeComment,
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};

// Custom Hook
export const useComments = () => {
  const context = useContext(CommentsContext);
  if (context === undefined) {
    throw new Error('useComments must be used within a CommentsProvider');
  }
  return context;
};
