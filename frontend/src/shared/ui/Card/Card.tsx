import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

interface CardProps {
  children: ReactNode;
  title?: string;
  subTitle?: string;
  footer?: ReactNode;
  className?: string;
}

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;
`;

const CardHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const CardSubTitle = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: #666;
`;

const CardBody = styled.div`
  padding: 20px;
`;

const CardFooter = styled.div`
  padding: 12px 20px;
  border-top: 1px solid #eee;
  background-color: #f8f9fa;
`;

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subTitle,
  footer,
  className,
}) => {
  return (
    <CardContainer className={className}>
      {(title || subTitle) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {subTitle && <CardSubTitle>{subTitle}</CardSubTitle>}
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  );
};
