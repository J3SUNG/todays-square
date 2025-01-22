import styled from "@emotion/styled";

export const FormContainer = styled.form`
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

export const FormTitle = styled.h1`
  font-size: 2rem;
  color: white;
  text-align: center;
  margin-bottom: 1rem;
  display: flex;
`;

export const FormFooterLinks = styled.div`
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
