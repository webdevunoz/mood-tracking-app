import { useRoutes } from "react-router-dom";
import routes from "./routes";
import "./App.css";

export type logData = {
  date: string;
  hours: string;
  mood: string;
};

function App() {
  const element = useRoutes(routes);
  return (
    <div id="background-wrapper">
      <div id="page-wrapper">{element}</div>
    </div>
  );
}

export default App;
