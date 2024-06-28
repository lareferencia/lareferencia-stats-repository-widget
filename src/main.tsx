import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import "./global.css";
import App from "./App.tsx";
import "./localization/i18n.ts";

import { theme } from "./theme/theme.ts";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

ReactDOM.createRoot(document.getElementById("lrhw-widget")!).render(
  <React.StrictMode>
  <I18nextProvider i18n={i18next}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </I18nextProvider>
  </React.StrictMode>
);
