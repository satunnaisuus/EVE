import * as React from "react";
import { createRoot } from 'react-dom/client';
import { App } from "./ui/app";
import { RootStore, RootStoreContext } from "./ui/stores/root-store";
import { GlobalStyle } from "./ui/styles";

const root = createRoot(document.getElementById('root'));

root.render(
    <RootStoreContext.Provider value={new RootStore()}>
        <GlobalStyle />
        <App />
    </RootStoreContext.Provider>
);