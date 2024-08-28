import "./App.css";
import { useMapRoutes } from "./routes";

function App() {
  const myRoute = useMapRoutes();
  console.log("timezone");

  return <div className="App">{myRoute}</div>;
}

export default App;
