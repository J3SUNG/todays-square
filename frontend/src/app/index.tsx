/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const appStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  font-size: 1.5rem;
  color: #333;
  background-color: #f4f4f4;
`;

const App = () => {
  return <div css={appStyles}>Hello, Todays Square!</div>;
};

export default App;
