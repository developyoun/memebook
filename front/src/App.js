
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteConfig from "./util/RouteConfig";

function App() {
  return (
      <Router>
          <div className="App">
              <RouteConfig></RouteConfig>
          </div>
      </Router>
  );
}

export default App;
