import styled, {createGlobalStyle} from 'styled-components';
import DisketMonoBold from '../../fonts/Disket-Mono-Bold.ttf';

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'DisketMono';
        src: url(${DisketMonoBold}) format('opentype');
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: DisketMono, monospace;
        font-size: 14px;
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
`;