// packages
import React, { Component, Suspense, lazy } from 'react';
import { Router, navigate } from '@reach/router';
// material UI components
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// components
import Loading from './components/Loading.js';
// pages
const Home = lazy(() => import('./pages/Home.js'));
const NoMatch = lazy(() => import('./pages/404.js'));
// misc
const themeData = lazy(() => import('./assets/Theme.js'));
const theme = createMuiTheme(themeData);

class App extends Component {
  componentDidMount() {
    // load the know path from local storage
    var lastPath = localStorage.getItem('lastPath');

    // if lastPath exists navigate to last know path
    if (lastPath && lastPath !== '/') {
      navigate(lastPath);
    }
  }

  render() {
    return (
      <div className='App'>
        <Suspense fallback={<Loading />}>
          <MuiThemeProvider theme={theme}>
            <Router>
              <Home path='/' />
              <NoMatch default />
            </Router>
          </MuiThemeProvider>
        </Suspense>
      </div>
    );
  }
}

export default App;
