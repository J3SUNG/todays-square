import { useState } from 'react';
import { useCommentsStore, CommentFormData } from '../../../entities/comment';
import { commentService } from '../service/commentService';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../shared/lib/helpers';

// 댓글 목록 로드 핸들러
export const useCommentsLoader = () => {
  const { setLoading, setComments, setError } = useCommentsStore();
  
  const loadComments = async (postId: string) => {
    setLoading(true);
    try {
      const comments = await commentService.fetchComments(postId);
      setComments(comments);
      setError(null);
      return comments;
    } catch (error) {
      setError(getErrorMessage(error));
      toast.error(getErrorMessage(error));
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  return loadComments;
};

// 댓글 작성 핸들러
export const useCreateCommentHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addComment } = useCommentsStore();
  
  const createComment = async (data: CommentFormData) => {
    setIsSubmitting(true);
    try {
      const newComment = await commentService.createComment(data);
      addComment(newComment);
      toast.success('댓글이 작성되었습니다.');
      return newComment;
    } catch (error) {
      toast.error(getErrorMessage(error));
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return { createComment, isSubmitting };
};

// 댓글 수정 핸들러
export const useUpdateCommentHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateComment: updateCommentInStore } = useCommentsStore();
  
  const updateComment = async (id: string, content: string) => {
    setIsSubmitting(true);
    try {
      await commentService.updateComment(id, content);
      updateCommentInStore(id, content);
      toast.success('댓글이 수정되었습니다.');
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return { updateComment, isSubmitting };
};

// 댓글 삭제 핸들러
export const useDeleteCommentHandler = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { removeComment } = useCommentsStore();
  
  const deleteComment = async (id: string) => {
    setIsDeleting(true);
    try {
      await commentService.deleteComment(id);
      removeComment(id);
      toast.success('댓글이 삭제되었습니다.');
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error));
      return false;
    } finally {
      setIsDeleting(false);
    }
  };
  
  return { deleteComment, isDeleting };
};

// 댓글 좋아요 핸들러
export const useLikeCommentHandler = () => {
  const likeComment = async (id: string) => {
    try {
      const { likes } = await commentService.likeComment(id);
      return likes;
    } catch (error) {
      toast.error(getErrorMessage(error));
      throw error;
    }
  };
  
  return likeComment;
};
