import { AppRouter } from "./router";
import { AppProviders } from "./providers/AppProviders";

const App = () => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
};

export default App;
