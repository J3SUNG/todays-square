import React from 'react';
import { useParams } from 'react-router-dom';
import { PostDetail } from '../../widgets/PostDetail';
import { CommentList } from '../../widgets/CommentList';
import styled from '@emotion/styled';

const PostPageContainer = styled.div`
  padding: 40px 20px;
`;

export const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }
  
  return (
    <PostPageContainer>
      <PostDetail postId={id} />
      <CommentList postId={id} />
    </PostPageContainer>
  );
};

export default PostPage;
