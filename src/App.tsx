import { ThemeProvider } from "styled-components";
import { TransactionsContextProvider } from "./context/TransactionsContext";
import { TransactionsPage } from "./pages/Transactions";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TransactionsContextProvider>
        <TransactionsPage />
      </TransactionsContextProvider>
    </ThemeProvider>
  );
}
