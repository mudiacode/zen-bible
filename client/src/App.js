import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StartPage from './components/StartPage';
import BibleViewer from './components/BibleViewer'; // Your Bible Viewer component

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={StartPage} />
        <Route path="/bible" component={BibleViewer} />
      </Switch>
    </Router>
  );
};

export default App;
