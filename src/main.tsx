import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { setupServiceWorker } from "./lib/registerSW";

setupServiceWorker();

createRoot(document.getElementById("root")!).render(<App />);
