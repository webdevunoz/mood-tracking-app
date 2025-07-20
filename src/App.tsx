import { useRoutes } from "react-router-dom";
import routes from "./routes";
import "./App.css";

function App() {
  const element = useRoutes(routes);
  return <div id="page-wrapper">{element}</div>;
}

export default App;
