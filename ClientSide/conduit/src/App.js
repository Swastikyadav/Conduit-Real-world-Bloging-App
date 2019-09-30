import React from 'react';
import Register from './Components/Register';
import Login from './Components/Login';
import Header from './Components/Navbar';
import Home from './Components/Home';
import './App.css';
import NewPost from './Components/Newpost';
import Setting from './Components/Settings';
import Profile from './Components/Profile';
import Page404 from './Components/Page404';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  changeUser = (user) => {
    this.setState({ user });
  }

  logoutUser = () => {
    this.setState({ user: null });
    localStorage.clear();
  }

  publicRoutes = () => {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user/register" exact component={Register} />
        <Route path="/user/login" exact render={() => <Login changeUser={this.changeUser} />} />
        <Route>
          <Page404 />
        </Route>
      </Switch>
    );
  }

  privateRoutes = () => {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/article/new" exact component={NewPost} />
        <Route path="/profile/settings" exact component={Setting} />
        <Route path="/profile" exact render={() => <Profile logoutUser={this.logoutUser} />} />
        <Route>
          <Page404 />
        </Route>
      </Switch>
    );
  }

  render() {
    const {user} = this.state;
    return (
      <>
        <Header user={user} />
        {
          user || localStorage.token ? this.privateRoutes() : this.publicRoutes()
        }
      </>
    );
  }
}

export default App;
