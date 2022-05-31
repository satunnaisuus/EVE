import * as React from "react";
import { createRoot } from 'react-dom/client';
import { App } from "./ui/app";
import { AppContext } from "./ui/context";
import { Store } from "./ui/store";
import { GlobalStyle } from "./ui/styles";

const root = createRoot(document.getElementById('root')!);
const store = new Store();

root.render(
    <AppContext.Provider value={store}>
        <GlobalStyle />
        <App />
    </AppContext.Provider>
);