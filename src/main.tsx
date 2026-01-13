
import { createRoot } from "react-dom/client";
import RootApp from "./app/RootApp.tsx";
import "./styles/index.css";
import "./design-system/theme.css";

createRoot(document.getElementById("root")!).render(<RootApp />);
