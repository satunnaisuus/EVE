import * as React from "react";
import { createRoot } from 'react-dom/client';
import { App } from "./ui/app";
import { AppContext, GenomeBankContext, SaveContext } from "./ui/context";
import { IndexedBdGenomeRepository } from "./ui/repository/indexedbd-genome-repository";
import { IndexedBdSaveRepository } from "./ui/repository/indexedbd-save-repository";
import { Store } from "./ui/store";
import { GenomeBankStore } from "./ui/stores/genome-bank-store";
import { SaveStore } from "./ui/stores/save-store";
import { GlobalStyle } from "./ui/styles";

const root = createRoot(document.getElementById('root')!);

const store = new Store();
const genomeBank = new GenomeBankStore(new IndexedBdGenomeRepository());

root.render(
    <AppContext.Provider value={store}>
        <GenomeBankContext.Provider value={genomeBank}>
            <SaveContext.Provider value={store.getSaveStore()}>
                <GlobalStyle />
                <App />
            </SaveContext.Provider>
        </GenomeBankContext.Provider>
    </AppContext.Provider>
);