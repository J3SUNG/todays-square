import { Global, css } from "@emotion/react";

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
  }
`;

export const GlobalStyles = () => <Global styles={globalStyles} />;
