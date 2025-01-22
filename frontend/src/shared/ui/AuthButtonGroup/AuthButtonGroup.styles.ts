// shared/components/AuthButton/AuthButton.styles.ts
import styled from "@emotion/styled";

export const AuthButtonWrapper = styled.button<{ image: string }>`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;

  &:hover {
    opacity: 0.8;
  }
`;

export const AuthButtonGroupWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
`;
