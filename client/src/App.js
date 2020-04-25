import React ,{ Fragment, useEffect }from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/Routes';
import './App.css';
import store from './store';
import { setUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import PublicRoute from './components/PublicRoute';

if(localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  useEffect(()=>{
    store.dispatch(setUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <PublicRoute exact restricted path="/" component={Landing}/>
            <Routes component={Routes}/>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}


export default App;
