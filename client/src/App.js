import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Index from './components/Index';
import  Header from './components/Header';
import {BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});


class App extends Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Router>
      <div className="App">
       <Header/>
      <Route exact path="/" component={Index} />
       
      
      </div>
      </Router>
    );
  }
}
export default withStyles(styles)(App);
