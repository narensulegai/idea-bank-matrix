import React from 'react';
import './App.css';
import Ideas from './components/Ideas';
import FunctionName from './components/FunctionName';
import 'typeface-roboto';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            IdeaBank workshop
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <FunctionName/>
          </Grid>
          <Grid item md={6}>
          </Grid>
        </Grid>
      </Container>

    </div>
  );
}

export default App;
