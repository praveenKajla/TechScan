import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react'
import {BrowserRouter as Router,Route,hashHistory} from 'react-router-dom';



import stores from './stores'
import Header from './Header'
import Home from './Home'
import SearchResults from './SearchResults'
import Profile from './Profile'
class Main extends Component {
  render() {

    return (
      <Provider {...stores}>
      <Router history={hashHistory}>
      <div >
      <Header />
      
      <Route exact path="/" component={Home}/>
      <Route path="/repo/:term" component={SearchResults}/>

      <Route exact path="/users/:username" component={Profile}/>

      </div>
    </Router>
    </Provider>
    );
  }
};

export default Main;