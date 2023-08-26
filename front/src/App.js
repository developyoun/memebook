
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from "./components/Footer";
import RouteConfig from "./util/RouteConfig";

function App() {
  return (
      <Router>
          <div className="App">
              <div className="wrap">
                  <Footer></Footer>
                  <RouteConfig></RouteConfig>
              </div>
          </div>
      </Router>
  );
}

export default App;
