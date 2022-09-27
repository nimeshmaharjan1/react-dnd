import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { store } from "@store/index";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </DndProvider>
  );
}

export default MyApp;
