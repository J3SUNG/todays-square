import styled from "@emotion/styled";

export const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  width: 500px;
  height: 600px;
  border: 1px solid #ececec;
  margin: auto;
`;

export const LoginFormTitle = styled.h1`
  font-size: 2rem;
  color: white;
  text-align: center;
  margin-bottom: 1rem;
  display: flex;
`;

export const LoginFormInputGroup = styled.div`
  display: flex;
  width: 300px;
  border-bottom: 1px solid #ececec;
`;

export const LoginFormInputLabel = styled.label`
  font-size: 0.9rem;
  color: #ececec;
  width: 80px;
  display: flex;
  align-items: center;
`;

export const LoginFormInput = styled.input`
  width: 100%;
  height: 50px;
  color: #ececec;
  font-size: 0.9rem;

  &::placeholder {
    color: #ececec;
    opacity: 0.7;
  }
`;

export const LoginFormButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

export const LoginFormButton = styled.button<{ primary?: boolean }>`
  display: flex;
  justify-content: center;
  width: 300px;
  height: 50px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: ${({ primary }) => (primary ? "black" : "white")};
  background-color: ${({ primary }) => (primary ? "white" : "transparent")};
  border: 2px solid white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const LoginFormAuthButtonGroup = styled.div`
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  gap: 1rem; /* 버튼 간 간격 */
  margin: 1rem 0; /* 위아래 여백 */
`;

export const LoginFormAuthButton = styled.button<{ image?: string }>`
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

export const LoginFormFooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  font-size: 0.9rem;

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
