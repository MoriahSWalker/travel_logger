import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
