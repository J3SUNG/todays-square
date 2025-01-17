import { Global, css } from "@emotion/react";

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #1e1b1b;
    color: #ececec;
  }
`;

export const GlobalStyles = () => <Global styles={globalStyles} />;
