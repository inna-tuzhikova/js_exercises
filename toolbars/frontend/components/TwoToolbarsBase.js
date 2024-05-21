import React from 'react';
import { useStyles } from './../util';
import TwoToolbarsBaseStyle from './../assets/styles/TwoToolbarsBaseStyle';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const TwoToolbarsBase = ({children}) => {
  const classes = useStyles(TwoToolbarsBaseStyle);
  return (
    <Grid
      container
      className={classes.root}
      direction='column'
      alignItems='stretch'>
      <Grid
        item
        className={classes.bar}
        xs={1} sm={1} md={1} lg={1} xl={1}>
      </Grid>
      <Grid
        item
        xs={10} sm={10} md={10} lg={10} xl={10}>
        {children}
      </Grid>
      <Grid
        item
        className={classes.bar}
        xs={1} sm={1} md={1} lg={1} xl={1}>
      </Grid>

    </Grid>
  );
};

export default TwoToolbarsBase;
