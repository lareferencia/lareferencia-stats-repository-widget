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

// ReactDOM.createRoot(document.getElementById("lrhw-widget")!).render(
//   <React.StrictMode>
//   <I18nextProvider i18n={i18next}>
//     <ChakraProvider theme={theme}>
//       <App />
//     </ChakraProvider>
//   </I18nextProvider>
//   </React.StrictMode>
// );

const WidgetWrapper = ({ root }: { root: HTMLBodyElement }) => {
  const cache = createCache({ key: "c", container: root });
  const rootRef = React.useRef<HTMLBodyElement>(root);
  
  return (
    <Portal containerRef={rootRef}>
      <CacheProvider value={cache}>
      <I18nextProvider i18n={i18next}>

        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </I18nextProvider>

      </CacheProvider>
    </Portal>
  );
};


function getRootElement() {
  
  const div = document.getElementById("lrhw-widget");
  const body = document.createElement("body");
  const shadowDom = div!.attachShadow({ mode: "open" });  
  shadowDom.appendChild(body);
  return body;
}

const initSnap = () => {
  console.log("initSnap");

  let reactRoot: ReactDOM.Root;
  const rootElement = getRootElement();
  reactRoot = ReactDOM.createRoot(rootElement!);
  reactRoot.render(<WidgetWrapper root={rootElement!} />);

  return () => reactRoot?.unmount?.();
};

initSnap();