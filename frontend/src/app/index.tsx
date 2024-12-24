import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "../shared/styles/globals";
import Home from "../pages/Home";
import Login from "../pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
