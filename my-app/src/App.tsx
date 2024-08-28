import "./App.css";
import { useMapRoutes } from "./routes";

function App() {
  const myRoute = useMapRoutes();
  return <div className="App">{myRoute}</div>;
}

export default App;
