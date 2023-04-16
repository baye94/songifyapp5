

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";


import store from "./store";
import Navbar from "./components/navBar";
import HomePage from "./pages/Home";
import FavoriPage from "./pages/Favori";


function App() {
  return (
    <Provider store={store}>
      <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/favori" component={FavoriPage} />
        
      </Switch>
    </Router>
        

      
    </Provider>
  );
}

export default App;
