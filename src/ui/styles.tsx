import styled, {createGlobalStyle} from 'styled-components';

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
        text-transform: uppercase;
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
`;