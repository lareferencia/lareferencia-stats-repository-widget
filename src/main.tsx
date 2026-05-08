import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, Portal } from "@chakra-ui/react";
import App from "./App.tsx";
import "./localization/i18n.ts";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { theme } from "./theme/theme.ts";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

export const ShadowRootContext = React.createContext<HTMLElement | null>(null);

const WidgetWrapper = ({ root }: { root: HTMLElement }) => {
  const cache = createCache({ key: "c", container: root });
  const rootRef = React.useRef<HTMLElement>(root);

  return (
    <ShadowRootContext.Provider value={root}>
      <Portal containerRef={rootRef}>
        <CacheProvider value={cache}>
          <I18nextProvider i18n={i18next}>
            <ChakraProvider theme={theme}>
              <App />
            </ChakraProvider>
          </I18nextProvider>
        </CacheProvider>
      </Portal>
    </ShadowRootContext.Provider>
  );
};

function getRootElement() {
  const div = document.getElementById("lrhw-widget");
  if (!div) {
    console.error("[lrhw-widget] Container element #lrhw-widget not found. Make sure the element exists before the script loads.");
    return null;
  }
  const shadowDom = div.attachShadow({ mode: "open" });
  // Crear un div en lugar de un body
  const container = document.createElement("div");
  container.style.fontFamily = "'Poppins', sans-serif";
  shadowDom.appendChild(container);
  const hostStyle = document.createElement("style");
  hostStyle.textContent = `:host { all: initial; display: block; }
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`;
  shadowDom.prepend(hostStyle);
  return container;
}

const initSnap = () => {
  const rootElement = getRootElement();
  if (!rootElement) return () => { /* no-op: widget container not found */ };
  const reactRoot = ReactDOM.createRoot(rootElement);
  reactRoot.render(<WidgetWrapper root={rootElement} />);

  return () => reactRoot?.unmount?.();
};

initSnap();