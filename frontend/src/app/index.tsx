import { AppRouter } from "./router";
import { AppProviders } from "./providers/AppProviders";
import { Navbar } from "../widgets/Navbar";
import Layout from "./Layout/Layout";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <AppProviders>
      <Navbar />
      <Layout>
        <AppRouter />
      </Layout>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </AppProviders>
  );
};

export default App;
