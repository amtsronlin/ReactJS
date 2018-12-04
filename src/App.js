// var React = require('react');
// var createReactClass = require('create-react-class');
// var App = createReactClass({
//   getInitialState: function() {
//     return {
//       members: []
//     };
//   },
//   componentDidMount() {
//     fetch('/users')
//       //.then(res => res.json())
//       //.then(members => this.setState({ members: members }));
//       .then(response => {
//         if (!response.ok) {
//           throw new Error("Bad response");
//         }
//         return response.json();
//       })
//       .then(members => this.setState({ members: members }))
//       .catch(error => console.error(error));
//   },
//   render: function() {
//     return (
//         <div className="Users">
//           <h1>Users</h1>
//           {this.state.members.map(member =>
//             <div key={member.id}>{member.name} - {member.email}</div>
//           )}
//         </div>
//     );
//   }
// });

// module.exports = App;
import React, { Fragment } from 'react';
import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';

import AppHeader from './components/AppHeader';
import Home from './pages/Home';

const styles = theme => ({
  main: {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      padding: 2 * theme.spacing.unit,
    },
  },
});

const App = ({ classes }) => (
  <Fragment>
    <CssBaseline />
    <AppHeader />
    <main className={classes.main}>
      <Home />
    </main>
  </Fragment>
);

export default withStyles(styles)(App);