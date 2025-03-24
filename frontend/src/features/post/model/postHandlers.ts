import { useState } from 'react';
import { usePostsStore, PostFormData, PostsFilter } from '../../../entities/post';
import { postService } from '../service/postService';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../shared/lib/helpers';

// SOLID의 Single Responsibility Principle 적용
// 각 핸들러는 하나의 책임만 담당

// 게시물 목록 가져오기
export const usePostsLoader = () => {
  const { setLoading, setPosts, setError, setTotalPosts, filters } = usePostsStore();
  
  const loadPosts = async (newFilters?: Partial<PostsFilter>) => {
    const currentFilters = { ...filters, ...newFilters };
    setLoading(true);
    try {
      const { posts, total } = await postService.fetchPosts(currentFilters);
      setPosts(posts);
      setTotalPosts(total);
      setError(null);
    } catch (error) {
      setError(getErrorMessage(error));
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  
  return loadPosts;
};

// 단일 게시물 가져오기
export const usePostLoader = () => {
  const { setLoading, setCurrentPost, setError } = usePostsStore();
  
  const loadPost = async (id: string) => {
    setLoading(true);
    try {
      const post = await postService.fetchPostById(id);
      setCurrentPost(post);
      setError(null);
      return post;
    } catch (error) {
      setError(getErrorMessage(error));
      toast.error(getErrorMessage(error));
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  return loadPost;
};

// 게시물 생성 핸들러
export const useCreatePostHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setLoading } = usePostsStore();
  
  const createPost = async (data: PostFormData) => {
    setIsSubmitting(true);
    setLoading(true);
    try {
      const newPost = await postService.createPost(data);
      toast.success('게시물이 성공적으로 작성되었습니다.');
      return newPost;
    } catch (error) {
      toast.error(getErrorMessage(error));
      throw error;
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };
  
  return { createPost, isSubmitting };
};

// 게시물 수정 핸들러
export const useUpdatePostHandler = (postId: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setCurrentPost, setLoading } = usePostsStore();
  
  const updatePost = async (data: PostFormData) => {
    setIsSubmitting(true);
    setLoading(true);
    try {
      const updated = await postService.updatePost(postId, data);
      setCurrentPost(updated);
      toast.success('게시물이 성공적으로 수정되었습니다.');
      return updated;
    } catch (error) {
      toast.error(getErrorMessage(error));
      throw error;
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };
  
  return { updatePost, isSubmitting };
};

// 게시물 삭제 핸들러
export const useDeletePostHandler = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const deletePost = async (id: string) => {
    setIsDeleting(true);
    try {
      await postService.deletePost(id);
      toast.success('게시물이 성공적으로 삭제되었습니다.');
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error));
      return false;
    } finally {
      setIsDeleting(false);
    }
  };
  
  return { deletePost, isDeleting };
};

// 게시물 좋아요 핸들러
export const useLikePostHandler = () => {
  const { setCurrentPost } = usePostsStore();
  
  const likePost = async (id: string) => {
    try {
      const { likes } = await postService.likePost(id);
      // 현재 포스트가 있으면 좋아요 수 업데이트
      setCurrentPost((prev) => {
        if (prev && prev.id === id) {
          return { ...prev, likes };
        }
        return prev;
      });
      return likes;
    } catch (error) {
      toast.error(getErrorMessage(error));
      throw error;
    }
  };
  
  return likePost;
};
