import React from 'react';
import Register from './Components/Register';
import Login from './Components/Login';
import Header from './Components/Navbar';
import Home from './Components/Home';
import './App.css';
import NewPost from './Components/Newpost';
import Setting from './Components/Settings';
import Profile from './Components/Profile';
import { Route, Redirect } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  changeUser = user => {
    this.setState({ user });
  }

  logoutUser = () => {
    this.setState({ user: null });
    localStorage.clear();
  }

  render() {
    const {user} = this.state;
    return (
      <>
        <Header user={user} />
        {/* Public Routes */}
        {
          localStorage.token ? (
            <>
              <Route path="/user/register" exact>
                <Redirect to="/" />
              </Route>
              <Route path="/user/login" exact>
                <Redirect to="/" />
              </Route>
              <Route path="/" exact component={Home} />
            </>
          ) : (
            <>
              <Route path="/user/register" exact component={Register} />
              <Route path="/user/login" exact render={() => <Login changeUser={this.changeUser} />} />
              <Route path="/" exact component={Home} />
            </>
          )
        }
        {/* Private Routes */}
        {
          localStorage.token ? (
            <>
              <Route path="/article/new" exact component={NewPost} />
              <Route path="/profile/settings" exact component={Setting} />
              <Route path="/profile" exact render={() => <Profile logoutUser={this.logoutUser} />} />
            </>
          ) : (
            <>
              <Route path="/article/new" exact>
                <Redirect to="/user/login" />
              </Route>
              <Route path="/profile/settings">
                <Redirect to="/user/login" />
              </Route>
              <Route path="/profile" exact>
                <Redirect to="user/login" />
              </Route>
            </>
          )
        }
      </>
    );
  }
}

export default App;
