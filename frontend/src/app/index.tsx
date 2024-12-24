import { AppRouter } from "./router";
import { AppProviders } from "./providers/AppProviders";
import { Navbar } from "../widgets/Navbar";

const App = () => {
  return (
    <AppProviders>
      <Navbar />
      <AppRouter />
    </AppProviders>
  );
};

export default App;
