import styled from "@emotion/styled";

export const InputWrapper = styled.div`
  display: flex;
  width: 300px;
  border-bottom: 1px solid #ececec;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  color: #ececec;
  width: 80px;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  color: #ececec;
  font-size: 0.9rem;

  &::placeholder {
    color: #ececec;
    opacity: 0.7;
  }
`;
