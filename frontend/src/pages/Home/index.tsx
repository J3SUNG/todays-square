/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const homeStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2rem;
`;

export const Home = () => {
  return <div css={homeStyles}>Welcome to the Home Page!</div>;
};
