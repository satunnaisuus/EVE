import * as React from "react";
import { Store } from "./store";

export const AppContext = React.createContext<Store>(null);