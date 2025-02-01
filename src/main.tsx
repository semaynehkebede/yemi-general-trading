import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import { Notifications } from "@mantine/notifications";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <Provider store={store}>
      <Toaster position="top-right" />
        <App />
      </Provider>
    </MantineProvider>
  </StrictMode>
);
