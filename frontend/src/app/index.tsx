import { AppRouter } from "./router";
import { AppProviders } from "./providers";
import { GlobalStyles } from "./styles";

const App = () => {
  return (
    <AppProviders>
      <GlobalStyles />
      <AppRouter />
    </AppProviders>
  );
};

export default App;
