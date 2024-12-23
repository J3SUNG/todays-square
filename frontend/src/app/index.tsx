import GlobalStyles from "../shared/styles/globals";
import Button from "../shared/Button";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <div>
        <h1>Welcome to the Todays Square!</h1>
        <Button onClick={() => console.log("Button clicked!")}>Click me!</Button>
      </div>
    </>
  );
};

export default App;
