import * as React from "react";
import { createRoot } from 'react-dom/client';
import App from "./ui/app";

const root = createRoot(document.getElementById('root')!);
root.render(<App />);