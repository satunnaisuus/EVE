import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: monospace;
        font-size: 16px;
    }

    input,
    button,
    select,
    optgroup,
    textarea {
        margin: 0;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }

    button {
        cursor: pointer;
    }

    canvas {
        display: block;
    }

    * {
        scrollbar-width: auto;
        scrollbar-color: #ffffff transparent;
    }

    *::-webkit-scrollbar {
        width: 8px;
        height: 3px;
    }

    *::-webkit-scrollbar-track {
        background: transparent;
    }

    *::-webkit-scrollbar-thumb {
        background-color: #ffffff;
        border-radius: 10px;
    }
`;