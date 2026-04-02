import "./App.css";
import MainContainer from "./components/MainContainer";
import Cursor from "./components/Cursor";

const App = () => {
  return (
    <>
      <Cursor />
      <main className="main-body main-active">
        <MainContainer />
      </main>
    </>
  );
};

export default App;
