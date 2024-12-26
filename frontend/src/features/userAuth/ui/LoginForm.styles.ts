import styled from "@emotion/styled";

export const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
  margin: auto;
`;

export const LoginFormInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: #6200ea;
    outline: none;
  }
`;
