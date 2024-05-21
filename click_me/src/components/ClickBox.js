import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ClickBoxStyle from './../assets/styles/ClickBoxStyle';
import Button from '@material-ui/core/Button';

const ClickBox = ({classes, clicks, onClick, onReset}) => {
  const btnText = 'Click me';
  const rstText = 'Reset';
  const handleClick = () => {
    onClick();
  };
  const handleReset = () => {
    onReset();
  };
  return (
    <div
      className={classes.root}>
        <h1 className={classes.header}>
          {`Clicks: ${clicks}`}
        </h1>
        <Button
          className={classes.btn}
          color='primary'
          variant='contained'
          onClick={handleClick}>
          {btnText}
        </Button>
        <Button
          className={classes.btn}
          color='primary'
          variant='contained'
          onClick={handleReset}>
          {rstText}
        </Button>
    </div>
  );
}

export default withStyles(ClickBoxStyle)(ClickBox);
