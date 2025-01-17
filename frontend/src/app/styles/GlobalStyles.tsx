import { Global, css } from "@emotion/react";

const globalStyles = css`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: sans-serif;
    background: none;
    color: inherit;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    all: unset;
    cursor: pointer;
    box-sizing: border-box;
  }

  input {
    all: unset;
  }

  ul,
  ol {
    list-style: none;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    box-sizing: border-box;
    background-color: #1e1b1b;
    color: #ececec;
  }
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
  }
`;

export const GlobalStyles = () => <Global styles={globalStyles} />;
