import "./App.css";
import logo from "./assets/images/logo_wildy_gamy.png";
import Room from "./pages/Room";

function App() {
  return (
    <>
      <img src={logo} alt="logo" className="logo" />
      <Room />
    </>
  );
}

export default App;
