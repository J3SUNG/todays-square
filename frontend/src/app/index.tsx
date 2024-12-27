import { AppRouter } from "./router";
import { AppProviders } from "./providers/AppProviders";
import { Navbar } from "../widgets/Navbar";
import Layout from "./Layout/Layout";

const App = () => {
  return (
    <AppProviders>
      <Navbar />
      <Layout>
        <AppRouter />
      </Layout>
    </AppProviders>
  );
};

export default App;
